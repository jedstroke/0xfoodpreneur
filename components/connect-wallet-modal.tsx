"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { StarkZap, OnboardStrategy, accountPresets } from "starkzap";
import { useConnect, ready } from "@starknet-react/core";
import { Wallet } from "lucide-react";

interface ConnectWalletModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ConnectWalletModal({ open, onOpenChange }: ConnectWalletModalProps) {
    const { connect, connectors: starknetConnectors } = useConnect();
    const { getAccessToken } = usePrivy();
    const localConnectors = ["ready", "starkzap"];

    const handleStarkzapConnect = async () => {
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                console.error("No privy access token found");
                return;
            }

            const sdk = new StarkZap({ network: "mainnet" });
            const onboard = await sdk.onboard({
                strategy: OnboardStrategy.Privy,
                accountPreset: accountPresets.argentXV050,
                privy: {
                    resolve: async () => {
                        const walletRes = await fetch("/api/wallet/starknet", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });
                        const { wallet } = await walletRes.json();

                        return {
                            walletId: wallet.id,
                            publicKey: wallet.publicKey,
                            serverUrl: "/api/wallet/sign",
                        };
                    },
                },
                deploy: "if_needed",
            });
            onOpenChange(false);
        } catch (error) {
            console.error("StarkZap connection error:", error);
        }
    };

    const handleReadyConnect = () => {
        const readyConnector = starknetConnectors.find(c => c.id === ready().id);
        if (readyConnector) {
            connect({ connector: readyConnector });
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] sm:w-[500px] max-w-md bg-slate-950 border-slate-800 text-slate-200 p-4 sm:p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                        <Wallet className="w-5 h-5 text-primary" />
                        Connect Wallet
                    </DialogTitle>

                </DialogHeader>
                <div className="flex flex-col gap-3 py-2 sm:py-4">
                    <DialogDescription className="text-sm text-slate-400 mb-2">
                        Choose a wallet to connect to Foodpreneur.
                    </DialogDescription>
                    {localConnectors.map((connector, index) => {
                        const isCartridge = connector.includes("starkzap");

                        return (
                            <Button
                                key={index}
                                onClick={isCartridge ? handleStarkzapConnect : handleReadyConnect}
                                variant="outline"
                                className={`w-full justify-start gap-3 border-slate-700 hover:bg-slate-800 hover:text-white text-wrap whitespace-normal ${isCartridge ? "py-4 sm:py-6 h-auto" : "h-14 sm:h-16"}`}
                            >
                                {isCartridge ? (
                                    <>
                                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-md p-0.5 shrink-0">
                                            <img src="/starkzap.png" alt="StarkZap" className="w-full h-full object-contain" />
                                            <img src="/privy.avif" alt="Privy" className="absolute -bottom-2 -right-1 w-auto h-5 sm:h-6 bg-slate-900 rounded-full border border-slate-700" />
                                        </div>
                                        <div className="flex flex-col items-start gap-0.5 text-left flex-1 min-w-0">
                                            <span className="font-semibold text-white text-sm sm:text-base">StarkZap</span>
                                            <span className="text-[10px] sm:text-xs text-slate-400 capitalize leading-snug">Powered by Privy</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {connector === "ready" ? (
                                            <img src="https://cdn.brandfetch.io/id_Vudv3NY/w/400/h/400/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1761113534851"
                                                alt="Ready" className="w-8 h-8 sm:w-10 sm:h-10 rounded-md shrink-0" />
                                        ) : (
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-slate-800 rounded-md shrink-0">
                                                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                                            </div>
                                        )}
                                        <span className="capitalize text-sm sm:text-base">{ready().name}</span>
                                    </>
                                )}
                            </Button>
                        );
                    })}
                    {localConnectors.length === 0 && (
                        <p className="text-sm text-red-400 text-center mt-2">
                            No connectors found. If you are on mobile, we suggest using the Ready Wallet for Starknet browser, or StarkZap (passkey, social login, and other supported methods).
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
