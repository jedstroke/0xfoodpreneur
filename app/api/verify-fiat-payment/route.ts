import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/flutterwave";
import { Account, RpcProvider, Contract, cairo } from "starknet";
import { verifySignature } from "@/lib/starknet-server";
import ABI from "@/constant/ABI.json";
import { MAINNET_CONTRACT_ADDRESS, TESTNET_CONTRACT_ADDRESS } from "@/constant/config";
import { getDb } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tx_ref, wallet_address, network, units, signature, signature_message } = body;

        if (!tx_ref || !wallet_address || !network || !units || !signature || !signature_message) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // 0. Check for Replay Attack (Duplicate tx_ref)
        const db = getDb();
        const existingTx = db.prepare('SELECT tx_ref FROM processed_payments WHERE tx_ref = ?').get(tx_ref);
        if (existingTx) {
            return NextResponse.json({ success: false, message: "Nice try! This transaction has already been used. 🚫" }, { status: 400 });
        }

        // 1. Verify Wallet Ownership (Signature Verification)
        try {
            // Ensure signature is an array of strings as verifySignature expects string[]
            const sigArray = Array.isArray(signature) ? signature : [signature];

            // Validate using shared utility from lib/starknet-server
            const isValid = await verifySignature(wallet_address, signature_message, sigArray);

            if (!isValid) {
                console.warn("Signature verification failed.");
                return NextResponse.json({ success: false, message: "Signature verification failed" }, { status: 400 });
            }

        } catch (err) {
            console.error("Validation error:", err);
            return NextResponse.json({ success: false, message: "Signature validation failed" }, { status: 400 });
        }


        // 2. Verify Payment
        const verification = await verifyPayment(tx_ref, network);

        if (!verification.success) {
            return NextResponse.json({
                success: false,
                message: verification.message || "Payment verification failed"
            }, { status: 400 });
        }

        // 3. Execute Fiat Sale
        const isTestnet = network === "sepolia";
        const privateKey = isTestnet ? process.env.TESTPRV : process.env.MAINPRV;
        const ownerAddress = isTestnet ? process.env.TESTPUB : process.env.MAINPUB;
        const contractAddress = isTestnet ? TESTNET_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS;

        if (!privateKey || !ownerAddress) {
            return NextResponse.json({ success: false, message: "Server configuration error (missing keys)" }, { status: 500 });
        }

        const provider = new RpcProvider({
            nodeUrl: isTestnet
                ? `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_10/${process.env.ALCHEMY_KEY}`
                : `https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_10/${process.env.ALCHEMY_KEY}`
        });

        // Instantiate Account
        const ownerAccount = new Account({ provider, address: ownerAddress, signer: privateKey });

        // Instantiate Contract with Owner Account
        const foodieContract = new Contract({
            abi: ABI,
            address: contractAddress as string,
            providerOrAccount: ownerAccount
        });

        const transferAmount = cairo.uint256(units);
        const tx = await foodieContract.fiatSale(wallet_address, transferAmount);

        await provider.waitForTransaction(tx.transaction_hash);

        // 4. Record tx_ref as processed to prevent replay
        db.prepare('INSERT INTO processed_payments (tx_ref) VALUES (?)').run(tx_ref);

        return NextResponse.json({
            success: true,
            tx_hash: tx.transaction_hash,
            units: units,
            wallet: wallet_address
        });

    } catch (error: any) {
        console.error("Fiat Sale Error:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
