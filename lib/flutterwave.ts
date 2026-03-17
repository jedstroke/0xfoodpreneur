import { getFlutterwaveKeys } from "./flutterwave-keys";

interface CreatePaymentProps {
    email: string;
    name: string;
    amountNGN: number;
    network: "mainnet" | "sepolia";
    redirectUrl: string;
    walletAddress: string;
    units: string;
}

export async function createPayment({ email, name, amountNGN, network, redirectUrl, walletAddress, units }: CreatePaymentProps) {
    try {
        const { secretKey } = getFlutterwaveKeys(network);
        const tx_ref = `foodie_${network}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        const res = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tx_ref,
                amount: amountNGN,
                currency: "NGN",
                redirect_url: redirectUrl,
                customer: {
                    email,
                    name,
                },
                meta: {
                    wallet_address: walletAddress,
                    units: units,
                    network: network
                },
                customizations: {
                    title: "Buy FOODIE Units",
                    description: `Purchase of ${units} FOODIE units`,
                    logo: "https://icon.png" // User can update this
                },
            }),
        });

        const data = await res.json();
        // Append the tx_ref we generated so the caller knows it
        return { ...data, tx_ref };
    } catch (error) {
        console.error("Flutterwave API Error:", error);
        return { success: false, message: "Network error during payment creation" };
    }
}

export async function verifyPayment(txRef: string, network: "mainnet" | "sepolia") {
    const { secretKey } = getFlutterwaveKeys(network);

    try {
        const res = await fetch(
            `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`,
            {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                },
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Flutterwave Verification Error (${res.status}):`, errorText);
            return { success: false, message: `Verification failed: ${res.statusText}` };
        }

        const data = await res.json();

        if (
            data.status === "success" &&
            data.data.status === "successful" &&
            data.data.currency === "NGN"
        ) {
            return {
                success: true,
                amount: data.data.amount,
                customer: data.data.customer.email,
                meta: data.data.meta // access wallet_address and units here if passed in meta
            };
        }

        return { success: false, message: "Transaction unclean or failed" };
    } catch (error) {
        console.error("Flutterwave API Error:", error);
        return { success: false, message: "Network error during verification" };
    }
}
