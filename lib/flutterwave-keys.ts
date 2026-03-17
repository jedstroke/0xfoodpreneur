export function getFlutterwaveKeys(network: "mainnet" | "sepolia") {
    const isTest = network === "sepolia";

    return {
        publicKey: isTest
            ? process.env.TFLWPUB
            : process.env.FLWPUB,

        secretKey: isTest
            ? process.env.TFLWPRV
            : process.env.FLWPRV,
    };
}
