"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Gift, Search, Send, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useFoodie } from "@/context/foodie-context";
import { useAccount, useProvider } from "@starknet-react/core";
import { toast } from "sonner";
import { Contract, cairo } from "starknet";
import ABI from "@/constant/ABI.json";
import { useChangeNetwork } from "@/context/starknet-provider";
import { Slot } from "@radix-ui/react-slot";

interface NftViewerModalProps {
    trigger?: React.ReactNode;
}

export default function NftViewerModal({ trigger }: NftViewerModalProps) {
    const { account, address } = useAccount();
    const { provider } = useProvider();
    const { getContractAddress } = useChangeNetwork();

    // Contracts
    const foodieContract = new Contract({ abi: ABI, address: getContractAddress(), providerOrAccount: account || provider });

    const [open, setOpen] = useState(false);
    const { units } = useFoodie();

    const [tokenId, setTokenId] = useState("");
    const [recipient, setRecipient] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "verifying">("idle");
    const [isOwned, setIsOwned] = useState<boolean | null>(null);

    const verifyOwnership = async () => {
        if (!tokenId) {
            toast.error("Please enter a Token ID");
            return;
        }

        setStatus("verifying");
        setIsOwned(null);

        try {
            const result = await foodieContract.call('ownerOf', [cairo.uint256(tokenId)]);
            // Result may be a bigint or an object depending on starknet.js version parsing
            let ownerAddress = "";
            if (typeof result === "bigint") {
                ownerAddress = "0x" + result.toString(16);
            } else if (typeof result === "object" && result !== null) {
                // handle potential struct response
                ownerAddress = "0x" + BigInt((result as any).address || result).toString(16);
            } else {
                ownerAddress = "0x" + BigInt(result as any).toString(16);
            }

            // Normalize addresses for comparison
            const normalizedOwner = ownerAddress.toLowerCase();
            const normalizedCurrent = (address || "").toLowerCase();

            // Simple checks - beware starknet addresses might lack padding
            if (BigInt(normalizedOwner) === BigInt(normalizedCurrent || "0x0")) {
                setIsOwned(true);
                toast.success(`You own Token #${tokenId}!`);
            } else {
                setIsOwned(false);
                toast.error(`Token #${tokenId} is owned by another address.`);
            }
        } catch (e) {
            console.error("Verification failed", e);
            setIsOwned(false);
            toast.error("Token ID not found or error occurred.");
        } finally {
            setStatus("idle");
        }
    };

    const handleGift = async () => {
        if (!account || !address) {
            toast.error("Wallet not connected");
            return;
        }

        if (!tokenId || isOwned !== true) {
            toast.error("Please verify ownership of the token first");
            return;
        }

        if (!recipient || recipient.length < 40) {
            toast.error("Please enter a valid Starknet address");
            return;
        }

        setStatus("loading");

        try {
            const transferTx = await foodieContract.invoke('safeTransferFrom', [
                address,
                recipient,
                cairo.uint256(tokenId),
                []
            ]);

            toast.promise(provider.waitForTransaction(transferTx.transaction_hash), {
                loading: 'Processing Gift Transfer...',
                success: () => {
                    setStatus("success");
                    return `Successfully Gifted Token #${tokenId}!`;
                },
                error: (err) => {
                    console.error(err);
                    setStatus("error");
                    throw err;
                },
            });
        } catch (e) {
            console.error(e);
            setStatus("error");
            toast.error("Gifting failed");
        }
    };

    const resetState = () => {
        setStatus("idle");
        setTokenId("");
        setRecipient("");
        setIsOwned(null);
    };

    const handleOpen = () => {
        if (!address) {
            toast.info("Please connect your wallet to view NFTs.");
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
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 transition-all whitespace-nowrap h-[42px]"
                >
                    <Gift className="w-4 h-4 text-primary" />
                    <span className="tracking-wide">My Access Tokens</span>
                </Button>
            )}

            <Dialog open={open} onOpenChange={(val) => {
                setOpen(val);
                if (!val) setTimeout(resetState, 300);
            }}>
                <DialogContent className="max-w-md mx-auto font-sans bg-slate-950 border-slate-800 p-0 overflow-y-auto max-h-[90vh] sm:rounded-xl shadow-2xl">
                    <DialogTitle className="sr-only">Access Token Viewer</DialogTitle>
                    {/* Header Pattern */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-primary to-indigo-500 opacity-80" />

                    <div className="p-6 space-y-6">
                        {status !== "success" ? (
                            <>
                                <div className="space-y-2 text-center">
                                    <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                        <ImageIcon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-100 tracking-tight">FOODIE Access Tokens</h2>
                                    <p className="text-slate-400 text-sm">You currently hold <span className="text-white font-bold">{units}</span> FOODIE {units === 1 ? 'token' : 'tokens'}.</p>
                                </div>

                                <div className="space-y-5 pt-4 border-t border-slate-800/50">
                                    <div className="space-y-3">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Search Your Token</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <Search className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <Input
                                                    type="number"
                                                    placeholder="Token ID (e.g. 1)"
                                                    value={tokenId}
                                                    onChange={(e) => {
                                                        setTokenId(e.target.value);
                                                        setIsOwned(null);
                                                    }}
                                                    className="pl-9 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 text-sm h-11"
                                                />
                                            </div>
                                            <Button
                                                onClick={verifyOwnership}
                                                disabled={!tokenId || status === "verifying"}
                                                className="bg-slate-800 hover:bg-slate-700 text-white h-11 px-4"
                                            >
                                                {status === "verifying" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                                            </Button>
                                        </div>

                                        {isOwned === true && (
                                            <div className="text-xs text-emerald-400 flex items-center gap-1.5 ml-1 animate-in fade-in">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                Verified Ownership
                                            </div>
                                        )}
                                    </div>

                                    {/* Gift Section */}
                                    <div className={`space-y-3 transition-all duration-300 ${isOwned ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] pointer-events-none'}`}>
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1 flex justify-between items-center">
                                            <span>Gift to a Friend</span>
                                            <Gift className="w-3.5 h-3.5" />
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Recipient Address (0x...)"
                                            value={recipient}
                                            onChange={(e) => setRecipient(e.target.value)}
                                            className="bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 text-sm h-11"
                                        />

                                        <Button
                                            onClick={handleGift}
                                            disabled={!recipient || !isOwned || status === "loading"}
                                            className="w-full relative overflow-hidden group h-12 bg-primary hover:bg-primary/90 text-black font-semibold mt-2"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Asset <Send className="w-4 h-4" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                                    <Gift className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">Gift Sent Successfully!</h3>
                                    <p className="text-slate-400 text-sm max-w-[250px] mx-auto">
                                        You have successfully transferred Token #{tokenId}.
                                    </p>
                                </div>

                                <Button
                                    onClick={() => setOpen(false)}
                                    variant="outline"
                                    className="border-slate-700 text-slate-300 hover:text-white"
                                >
                                    Done
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
