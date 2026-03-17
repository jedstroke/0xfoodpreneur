import { NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/node";

const privyAppId = process.env.PRIVY_APP_ID || '';
const privyAppSecret = process.env.PRIVY_APP_SECRET || '';

const privy = new PrivyClient({
  appId: privyAppId,
  appSecret: privyAppSecret,
});

export async function POST(req: Request) {
  try {
    const { walletId, hash } = await req.json();

    if (!walletId || !hash) {
      return NextResponse.json({ error: "walletId and hash are required" }, { status: 400 });
    }

    const result = await privy.wallets().rawSign(walletId, {
      params: { hash },
    });

    return NextResponse.json({ signature: result.signature });
  } catch (error: any) {
    console.error("Privy raw sign error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
