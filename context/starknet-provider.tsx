"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
    StarknetConfig,
    jsonRpcProvider,
    ready,
    useInjectedConnectors,
    voyager,
} from "@starknet-react/core";
import {
    TESTNET_CONTRACT_ADDRESS,
    MAINNET_CONTRACT_ADDRESS,
    USDC_TESTNET_ADDRESS,
    USDC_MAINNET_ADDRESS
} from "@/constant/config";
import { FoodieProvider } from "./foodie-context";

type Network = "sepolia" | "mainnet";

interface NetworkContextType {
    network: Network;
    setNetwork: (network: Network) => void;
    getContractAddress: () => string;
    getUSDCAddress: () => string;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function useChangeNetwork() {
    const context = useContext(NetworkContext);
    if (!context) {
        throw new Error("useNetwork must be used within NetworkProvider");
    }
    return context;
}



export function StarknetProvider({ children }: { children: ReactNode }) {

    const [network, setNetwork] = useState<Network>("mainnet");

    const { connectors: injectedConnectors } = useInjectedConnectors({
        // Show these connectors if the user has no connector installed.
        recommended: [
            ready(),
        ],
        includeRecommended: "always",
        order: "alphabetical",
        shimLegacyConnectors: ["okxwallet"],
    });

    const getContractAddress = () => {
        return network === "sepolia" ? TESTNET_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS;
    };

    const getUSDCAddress = () => {
        return network === "sepolia" ? USDC_TESTNET_ADDRESS : USDC_MAINNET_ADDRESS;
    };

    const provider = jsonRpcProvider({
        rpc: (chain) => {
            const url = chain === mainnet
                ? "https://api.cartridge.gg/x/starknet/mainnet"
                : "https://api.cartridge.gg/x/starknet/sepolia";
            return { nodeUrl: url };
        },
    });

    const connectors = [...injectedConnectors];

    return (
        <NetworkContext.Provider value={{ network, setNetwork, getContractAddress, getUSDCAddress }}>
            <StarknetConfig
                chains={[mainnet, sepolia]}
                provider={provider}
                connectors={connectors}
                explorer={voyager}
            >
                <FoodieProvider>
                    {children}
                </FoodieProvider>
            </StarknetConfig>
        </NetworkContext.Provider>
    );
}
