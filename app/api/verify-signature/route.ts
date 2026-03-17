import { NextResponse } from "next/server";
import { verifySignature } from "@/lib/starknet-server";
import { type TypedData } from "starknet";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { address, message, signature } = body;

        if (!address || !message || !signature) {
            return NextResponse.json(
                { error: "Missing required fields: address, message, or signature" },
                { status: 400 }
            );
        }

        // Verify the signature using our server-side utility
        const isValid = await verifySignature(address, message as TypedData, signature);

        return NextResponse.json({ verified: isValid });
    } catch (error) {
        console.error("Verification API error:", error);
        return NextResponse.json(
            { error: "Internal server error during verification" },
            { status: 500 }
        );
    }
}
