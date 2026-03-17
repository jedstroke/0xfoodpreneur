"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PrivyProvider
            appId={process.env.PRIVY_APP_ID || "cm01234567890123456789012"}
            config={{
                appearance: {
                    theme: "dark",
                    accentColor: "#676FFF",
                    // logo: "https://foodprenuergetyour.website/logo.png", // You can update this later
                },
            }}
        >
            {children}
        </PrivyProvider>
    );
}
