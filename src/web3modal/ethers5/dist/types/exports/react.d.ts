import type { Web3ModalOptions } from '../src/client.js';
import { Web3Modal } from '../src/client.js';
import { ethers } from 'ethers';
export type { Web3ModalOptions } from '../src/client.js';
export declare function createWeb3Modal(options: Web3ModalOptions): Web3Modal;
export declare function useWeb3ModalProvider(): {
    walletProvider: ethers.providers.ExternalProvider | undefined;
    walletProviderType: "walletConnect" | "injected" | "coinbaseWallet" | "eip6963" | "w3mEmail" | undefined;
};
export declare function useDisconnect(): {
    disconnect: () => Promise<void>;
};
export declare function useSwitchNetwork(): {
    switchNetwork: (chainId: number) => Promise<void>;
};
export declare function useWeb3ModalAccount(): {
    address: `0x${string}` | undefined;
    isConnected: boolean;
    chainId: number | undefined;
};
export declare function useWeb3ModalError(): {
    error: unknown;
};
export { useWeb3ModalTheme, useWeb3Modal, useWeb3ModalState, useWeb3ModalEvents } from '@web3modal/scaffold-react';
export { defaultConfig } from '../../esm/src/utils/defaultConfig.js';
