"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle2, XCircle, Info, Image as ImageIcon } from 'lucide-react';
import { useFoodie } from "@/context/foodie-context";  // Adapted import
import { useAccount, useProvider, useNetwork } from "@starknet-react/core";
import { toast } from "sonner";
import { calculateTotalCost } from "@/lib/usdc-cost";
import { cairo, Contract, constants } from "starknet";
import erc20ABI from "@/constant/USDCABI.json";
import ABI from "@/constant/ABI.json";
import { useChangeNetwork } from "@/context/starknet-provider";
import Link from "next/link"; // For T&C link if needed
import { Slot } from "@radix-ui/react-slot";
import ConnectWalletModal from "@/components/connect-wallet-modal";

// Helper for rotating text (Simplified version or replace with actual component)
const RotatingText = ({ texts, className }: { texts: string[], className?: string }) => {
    const [index, setIndex] = useState(0);
    // Logic to rotate text can be added, for now static first item
    return <span className={className}>{texts[0]}</span>;
};

interface BuyUnitsModalProps {
    trigger?: React.ReactNode;
}

export default function BuyUnitsModal({ trigger }: BuyUnitsModalProps) {
    const { account } = useAccount();
    const { provider } = useProvider();
    const { getUSDCAddress, getContractAddress, network } = useChangeNetwork();
    // const { chain } = useNetwork(); // Unused for now

    // Contracts
    const foodieContract = new Contract({ abi: ABI, address: getContractAddress(), providerOrAccount: account });
    const usdcContract = new Contract({ abi: erc20ABI, address: getUSDCAddress(), providerOrAccount: account });

    const [open, setOpen] = useState(false);
    const { totalSupply, price } = useFoodie();
    const { address } = useAccount();

    const [units, setUnits] = useState("");
    const [email, setEmail] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false); // New Terms State
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [paymentMethod, setPaymentMethod] = useState<"fiat" | "crypto" | null>(null);

    const handleBuy = async (method: "fiat" | "crypto") => {
        if (!termsAccepted) {
            toast.error("You must accept the Terms and Conditions to proceed.");
            return;
        }

        setPaymentMethod(method);
        setStatus("loading");

        if (!units || Number(units) <= 0) {
            toast.error("Please enter a valid amount");
            setStatus("idle");
            return;
        }

        try {
            if (method === "crypto") {
                const expectedCost = calculateTotalCost(BigInt(totalSupply), BigInt(units));

                const approvePromise = async () => {
                    const approveTx = await usdcContract.invoke('approve', [getContractAddress(), cairo.uint256(expectedCost)]);
                    await provider.waitForTransaction(approveTx.transaction_hash);
                };

                toast.promise(approvePromise(), {
                    loading: 'Approving USDC...',
                    success: async () => {
                        const buyTx = await foodieContract.invoke('buy', [cairo.uint256(units)]);
                        await provider.waitForTransaction(buyTx.transaction_hash);
                        setStatus("success");
                        // resetState(); // Don't reset immediately on success so they can see the reveal
                        return 'Transaction Successful';
                    },
                    error: (err) => {
                        console.error(err);
                        setStatus("error");
                        throw err;
                    },
                });
            } else {
                // Fiat Flow
                if (!account || !address) {
                    toast.error("Wallet not connected");
                    setStatus("idle");
                    return;
                }

                if (!email || !/\S+@\S+\.\S+/.test(email)) {
                    toast.error("Please enter a valid email address");
                    setStatus("idle");
                    return;
                }

                const amountNGN = Number(units) * price * 1700; // Updated rate estimate or fetch dynamic

                const typedData = {
                    types: {
                        StarknetDomain: [
                            { name: "name", type: "shortstring" },
                            { name: "version", type: "shortstring" },
                            { name: "chainId", type: "shortstring" },
                            { name: "revision", type: "shortstring" },
                        ],
                        Purchase: [
                            { name: "units", type: "felt" },
                            { name: "timestamp", type: "felt" },
                            { name: "account", type: "felt" },
                        ]
                    },
                    primaryType: "Purchase",
                    domain: {
                        name: "FOODIE", // Updated Name
                        version: "1.0",
                        chainId: network === 'sepolia' ? "SN_SEPOLIA" : "SN_MAIN",
                        revision: "1",
                    },
                    message: {
                        units: units,
                        timestamp: Math.floor(Date.now() / 1000).toString(),
                        account: account.address,
                    }
                };

                let signature;
                try {
                    signature = await account.signMessage(typedData);
                } catch (sigErr) {
                    console.error("Signing failed", sigErr);
                    toast.error("Failed to sign message. Please verify ownership.");
                    setStatus("idle");
                    return;
                }

                // Store details for callback
                const redirectUrl = window.location.origin + "/payment/callback";

                const response = await fetch("/api/create-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        name: "Foodie Club Member",
                        amountNGN: Math.ceil(amountNGN),
                        network: network,
                        redirectUrl: redirectUrl,
                        walletAddress: address,
                        units: units
                    })
                });

                const result = await response.json();

                if (result.success) {
                    const { link, tx_ref } = result.data;

                    // Store strict data for verification
                    localStorage.setItem(`foodie_payment_${tx_ref}`, JSON.stringify({
                        wallet_address: address,
                        units,
                        network,
                        signature,
                        signature_message: typedData
                    }));

                    // Redirect
                    window.location.href = link;
                } else {
                    toast.error(result.message || "Failed to initialize payment");
                    setStatus("error");
                }
            }
        } catch (e) {
            console.error(e);
            setStatus("error");
            toast.error("Transaction failed");
        }
    };

    const resetState = () => {
        setStatus("idle");
        setPaymentMethod(null);
        setUnits("");
        setEmail("");
        setTermsAccepted(false);
    };

    const [showConnectModal, setShowConnectModal] = useState(false);

    const handleOpen = () => {
        if (!address) {
            setShowConnectModal(true);
            return;
        }
        setOpen(true);
    };

    return (
        <>
            {trigger ? (
                <Slot onClick={handleOpen}>
                    {trigger}
                </Slot>
            ) : (
                <Button
                    onClick={handleOpen}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black font-bold rounded-lg px-6 py-2.5 transition-all shadow-lg whitespace-nowrap h-[42px]"
                >
                    <ImageIcon className="w-4 h-4" />
                    <span className="tracking-wide">Join Foodie Club</span>
                </Button>
            )}

            <Dialog open={open} onOpenChange={(val) => {
                setOpen(val);
                if (!val) setTimeout(resetState, 300);
            }}>
                <DialogContent className="sm:max-w-md bg-slate-950 border-slate-800 text-slate-200 overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-white">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            Join Foodie Club
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-4">
                        {status === "idle" && (
                            <>
                                <p className="text-sm text-slate-400 mb-2">
                                    Unlock access to the exclusive community. Current Price: ${price.toFixed(2)} / ₦{(price * 1700).toLocaleString()}. Total Member Limit: {totalSupply} NFTs
                                </p>

                                {/* Info Card (Optional but kept minimal) */}

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Quantity</label>
                                        <Input
                                            type="number"
                                            placeholder="Quantity..."
                                            min="1"
                                            value={units}
                                            onChange={(e) => setUnits(e.target.value)}
                                            className="bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 text-sm py-6"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Email (for Fiat Receipt)</label>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email..."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 text-sm py-6"
                                        />
                                    </div>

                                    {/* Terms and Conditions Checkbox */}
                                    <div className="flex items-center space-x-2 py-2">
                                        <Checkbox
                                            id="terms"
                                            checked={termsAccepted}
                                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                                            className="border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300"
                                        >
                                            I have read and agree to the <span className="font-bold text-white underline decoration-primary/50 underline-offset-4">Terms & Conditions</span>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        <Button
                                            onClick={() => handleBuy("fiat")}
                                            disabled={!termsAccepted}
                                            variant="outline"
                                            className="w-full justify-start gap-3 border-slate-700 hover:bg-slate-800 hover:text-white"
                                        >
                                            Buy with Fiat
                                        </Button>

                                        <Button
                                            onClick={() => handleBuy("crypto")}
                                            disabled={!termsAccepted}
                                            variant="outline"
                                            className="w-full justify-start gap-3 border-slate-700 hover:bg-slate-800 hover:text-white"
                                        >
                                            Buy with Crypto
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {status === "loading" && (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                    <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-200">Processing Transaction</h3>
                                    <p className="text-slate-500 text-sm mt-1">Please confirm in your {paymentMethod === "fiat" ? "provider" : "wallet"}...</p>
                                </div>
                            </div>
                        )}

                        {status === "success" && (
                            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Welcome Aboard!</h3>
                                    <p className="text-slate-400 text-sm max-w-[250px] mx-auto">
                                        You are now a member of the Foodpreneur Network.
                                    </p>
                                </div>

                                {/* Discord Reveal Section */}
                                <div className="w-full bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 space-y-2">
                                    <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-2">Your Community Access</p>
                                    <Button
                                        onClick={() => window.open("https://discord.gg/foodpreneur-mock-link", "_blank")}
                                        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold"
                                    >
                                        Join Discord Server
                                    </Button>
                                    <p className="text-xs text-slate-500 pt-2">
                                        Note: This link is unique to your transaction.
                                    </p>
                                </div>

                                <Button
                                    onClick={() => setOpen(false)}
                                    variant="ghost"
                                    className="text-slate-400 hover:text-white"
                                >
                                    Close Window
                                </Button>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]">
                                    <XCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Transaction Failed</h3>
                                    <p className="text-slate-400 text-sm max-w-[250px] mx-auto">Something went wrong. Please try again.</p>
                                </div>
                                <div className="flex gap-3 w-full">
                                    <Button
                                        onClick={() => setOpen(false)}
                                        variant="outline"
                                        className="flex-1 border-slate-700 text-red-500"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => setStatus("idle")}
                                        className="flex-1 bg-slate-100 hover:bg-white text-slate-900"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <ConnectWalletModal open={showConnectModal} onOpenChange={setShowConnectModal} />
        </>
    );
}
