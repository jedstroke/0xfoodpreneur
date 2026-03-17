import { NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/node";

const privyAppId = process.env.PRIVY_APP_ID || process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
const privyAppSecret = process.env.PRIVY_APP_SECRET || "";

const privy = new PrivyClient({
  appId: privyAppId,
  appSecret: privyAppSecret,
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const wallet = await privy.wallets().create({
      chain_type: "starknet",
      owner: { user_id: userId },
    });

    return NextResponse.json({
      wallet: {
        id: wallet.id,
        address: wallet.address,
        publicKey: wallet.public_key,
      },
    });
  } catch (error: any) {
    console.error("Privy wallet creation error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
