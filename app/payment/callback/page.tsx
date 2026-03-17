"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

function PaymentCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [message, setMessage] = useState("Verifying your payment and finalizing purchase...");

    useEffect(() => {
        const verify = async () => {
            const tx_ref = searchParams.get("tx_ref");
            const statusParam = searchParams.get("status");
            const transaction_id = searchParams.get("transaction_id");

            if (statusParam !== "successful" && statusParam !== "completed") {
                setStatus("error");
                setMessage("Payment was not successful. Please try again.");
                return;
            }

            if (!tx_ref) {
                setStatus("error");
                setMessage("Invalid transaction reference.");
                return;
            }

            try {
                // Retrieve stored payment details (Adapted key)
                const storedData = localStorage.getItem(`foodie_payment_${tx_ref}`);
                if (!storedData) {
                    throw new Error("Payment session expired or invalid. Please contact support if you were charged.");
                }

                const { wallet_address, units, network, signature, signature_message } = JSON.parse(storedData);

                const response = await fetch("/api/verify-fiat-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tx_ref,
                        transaction_id,
                        wallet_address,
                        network,
                        units,
                        signature,
                        signature_message
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    setStatus("success");
                    setMessage(`Successfully minted ${units} FOODIE to your wallet!`);
                    // Cleanup
                    localStorage.removeItem(`foodie_payment_${tx_ref}`);
                } else {
                    throw new Error(data.message || "Verification failed");
                }
            } catch (err: any) {
                console.error(err);
                setStatus("error");
                setMessage(err.message || "An error occurred during verification.");
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl space-y-6 text-center">
                {status === "verifying" && (
                    <>
                        <div className="relative mx-auto w-16 h-16">
                            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                            <Loader2 className="w-16 h-16 text-amber-500 animate-spin relative z-10" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-100">Verifying Payment</h2>
                        <p className="text-slate-400 text-sm">{message}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Purchase Complete!</h2>
                        <p className="text-slate-400 text-sm">{message}</p>
                        <Button
                            onClick={() => router.push("/")}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white mt-4"
                        >
                            Return to Home
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] mx-auto">
                            <XCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Verification Failed</h2>
                        <p className="text-red-400 text-sm">{message}</p>
                        <Button
                            onClick={() => router.push("/")}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 mt-4"
                        >
                            Return to Home
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function PaymentCallbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-amber-500" /></div>}>
            <PaymentCallbackContent />
        </Suspense>
    );
}
