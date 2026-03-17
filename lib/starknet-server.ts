import { RpcProvider, Contract, type TypedData, cairo } from "starknet";
import { TESTNET_CONTRACT_ADDRESS, MAINNET_CONTRACT_ADDRESS } from "@/constant/config";
import ABI from '@/constant/ABI.json' assert { type: 'json' };


const IS_MAINNET = true;

const CONTRACT_ADDRESS = IS_MAINNET ? MAINNET_CONTRACT_ADDRESS : TESTNET_CONTRACT_ADDRESS;

if (!process.env.ALCHEMY_KEY) {
    console.warn("ALCHEMY_KEY is not set. Starknet server operations may fail.");
}

const NODE_URL = IS_MAINNET
    ? `https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_10/${process.env.ALCHEMY_KEY || ""}`
    : `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_10/${process.env.ALCHEMY_KEY || ""}`;

const provider = new RpcProvider({ nodeUrl: NODE_URL });

/**
 * Verifies a Starknet signature using SNIP-12 TypedData.
 * Checks against the Account contract's isValidSignature.
 */
export async function verifySignature(
    address: string,
    message: TypedData,
    signature: string[]
): Promise<boolean> {
    try {
        // The provider method handles hashing and the isValidSignature call internally.
        // It is the standard way to verify TypedData in the Starknet network.
        const isValid = await provider.verifyMessageInStarknet(
            message,
            signature,
            address
        );

        return isValid;
    } catch (error) {
        console.error("Signature verification error:", error);
        return false;
    }
}
/**
 * Checks if a specific wallet address owns a given NFT token ID.
 * Uses the 'owner_of' contract method.
 */
export async function checkNFTOwnership(address: string, tokenId: number): Promise<boolean> {
    try {

        const contract = new Contract({ abi: ABI, address: CONTRACT_ADDRESS, providerOrAccount: provider });

        // owner_of expects u256
        // Use standard cairo utility
        const tokenIdUint256 = cairo.uint256(tokenId);

        // Pass as object compatible with cairo struct
        const ownerBigInt = await contract.owner_of(tokenIdUint256);

        // Convert to hex for comparison
        const ownerHex = "0x" + BigInt(ownerBigInt).toString(16);
        const addressHex = address.toLowerCase();

        // Normalize addresses (pad or BigInt comparison)
        return BigInt(ownerHex) === BigInt(addressHex);
    } catch (error) {
        console.error(`Error checking ownership for token ${tokenId}:`, error);
        return false;
    }
}

/**
 * Gets the total supply of minted NFTs.
 * Uses the 'totalAmountOfMintedNfts' contract method.
 */
export async function getTotalSupply(): Promise<number> {
    try {

        const contract = new Contract({ abi: ABI, address: CONTRACT_ADDRESS, providerOrAccount: provider });

        const supplyStruct = await contract.totalAmountOfMintedNfts();
        // Returns u256 as { low, high } usually or bigint if auto-converted
        // Contract calls in JS often return object for u256

        let supply = BigInt(0);
        if (typeof supplyStruct === 'object' && 'low' in supplyStruct) {
            supply = BigInt(supplyStruct.low) + (BigInt(supplyStruct.high) << BigInt(128));
        } else {
            supply = BigInt(supplyStruct);
        }

        return Number(supply);
    } catch (error) {
        console.error("Error fetching total supply:", error);
        // During dev/test if contract doesn't exist or ABI mismatch, allow bypass or throw?
        // User wants explicit check.
        throw error;
    }
}

/**
 * Gets the balance of RZN tokens for a specific address.
 * Uses the 'balanceOf' contract method.
 */
export async function getBalance(address: string): Promise<number> {
    try {
        const contract = new Contract({ abi: ABI, address: CONTRACT_ADDRESS, providerOrAccount: provider });

        // balanceOf returns u256
        const balanceStruct = await contract.balanceOf(address);

        let balance = BigInt(0);
        if (typeof balanceStruct === 'object' && 'low' in balanceStruct) {
            balance = BigInt(balanceStruct.low) + (BigInt(balanceStruct.high) << BigInt(128));
        } else {
            balance = BigInt(balanceStruct);
        }

        return Number(balance);
    } catch (error) {
        console.error(`Error fetching balance for ${address}:`, error);
        return 0;
    }
}
