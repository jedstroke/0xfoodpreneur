const START_PRICE = BigInt(5) * BigInt(10) ** BigInt(16); // 0.05 USDC (scaled by 1e16)
const SLOPE = BigInt(15) * BigInt(10) ** BigInt(16);      // Price increase per block (scaled by 1e18)
const BLOCK_SIZE = BigInt(7);  // 7 NFTs per block
const DIVISOR = BigInt(10) ** BigInt(12);

export function calculateTotalCost(currentSupply: bigint, amountToBuy: bigint): bigint {
    let supply = currentSupply;
    let remaining = amountToBuy;
    let totalCost = BigInt(0);

    while (remaining > BigInt(0)) {
        const blockIndex = supply / BLOCK_SIZE;
        const nextBoundary = (blockIndex + BigInt(1)) * BLOCK_SIZE;
        const availableInBlock = nextBoundary - supply;

        const amountInThisBlock =
            remaining < availableInBlock ? remaining : availableInBlock;

        // Price already scaled to 1e6 (0.05 USDC = 50,000)
        const price = START_PRICE + SLOPE * blockIndex;

        // Multiply first (1e6 * 1e6 = 1e12)
        const costRaw = price * amountInThisBlock;

        // Downscale to 1e6 USDC units
        totalCost += costRaw / DIVISOR;

        supply += amountInThisBlock;
        remaining -= amountInThisBlock;
    }

    return totalCost;
}
