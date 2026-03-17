import { NextResponse } from "next/server";
import { createPayment } from "@/lib/flutterwave";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, amountNGN, network, redirectUrl, walletAddress, units } = body;

        // Basic validation
        if (!email || !amountNGN || !network || !redirectUrl || !walletAddress || !units) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // Call the helper function (now running server-side)
        const paymentData = await createPayment({
            email,
            name,
            amountNGN,
            network,
            redirectUrl,
            walletAddress,
            units
        });

        if (paymentData.status === "success") {
            return NextResponse.json({
                success: true,
                data: {
                    ...paymentData.data,
                    tx_ref: paymentData.tx_ref
                }
            });
        } else {
            return NextResponse.json({ success: false, message: paymentData.message || "Failed to initiate payment" }, { status: 400 });
        }

    } catch (error: any) {
        console.error("Payment Creation Error:", error);
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
