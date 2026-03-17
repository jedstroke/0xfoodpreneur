"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAccount } from "@starknet-react/core";
import ABI from '@/constant/ABI.json' assert { type: 'json' };
import { useChangeNetwork } from "./starknet-provider";
import { uint256, RpcProvider, Contract } from "starknet";

interface FoodieContextType {
    totalSupply: number;
    units: number;
    price: number;
}

const FoodieContext = createContext<FoodieContextType | undefined>(undefined);

export function useFoodie() {
    const context = useContext(FoodieContext);
    if (!context) {
        throw new Error("useFoodie must be used within FoodieProvider");
    }
    return context;
}

export function FoodieProvider({ children }: { children: ReactNode }) {
    const { getContractAddress, network } = useChangeNetwork();
    const contractAddress = getContractAddress();
    const { account } = useAccount();
    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [units, setUnits] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);


    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const baseUrl = network === "sepolia"
                    ? `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_10/gsh_EcQ4gS-v3klZJUed3`
                    : `https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_10/gsh_EcQ4gS-v3klZJUed3`;

                // Re-instantiate provider to ensure freshness
                const provider = new RpcProvider({ nodeUrl: baseUrl });

                const contract = new Contract({ abi: ABI, address: contractAddress, providerOrAccount: provider });

                // 1. Total Supply
                const supplyData = await contract.call("totalAmountOfMintedNfts", []);

                if (typeof supplyData === 'bigint') {
                    if (isMounted) setTotalSupply(Number(supplyData));
                } else if (typeof supplyData === 'object' && supplyData) {
                    // @ts-ignore
                    const val = uint256.uint256ToBN(supplyData);
                    if (isMounted) setTotalSupply(Number(val));
                }

                // 2. Price
                const priceData = await contract.call("getCurrentPrice", []);
                if (priceData) {
                    // @ts-ignore
                    const priceBN = uint256.uint256ToBN(priceData);
                    if (isMounted) setPrice(Number(priceBN) / 1e18);
                }

                // 3. Units (Balance)
                if (account) {
                    // @ts-ignore
                    const balanceData = await contract.call("balance_of", [account.address]);
                    if (balanceData) {
                        // @ts-ignore
                        const balBN = uint256.uint256ToBN(balanceData);
                        if (isMounted) setUnits(Number(balBN));
                    }
                } else {
                    if (isMounted) setUnits(0);
                }

            } catch (error) {
                console.error("Error fetching FOODIE data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10s

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [network, contractAddress, account]);

    return (
        <FoodieContext.Provider value={{ totalSupply, units, price }}>
            {children}
        </FoodieContext.Provider>
    );
}
