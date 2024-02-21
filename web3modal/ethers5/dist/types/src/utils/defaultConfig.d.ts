import '@web3modal/polyfills';
import type { Metadata, ProviderType } from '../../../../../scaffold-utils/dist/types/exports/ethers';
export interface ConfigOptions {
    enableEIP6963?: boolean;
    enableInjected?: boolean;
    enableCoinbase?: boolean;
    rpcUrl?: string;
    defaultChainId?: number;
    metadata: Metadata;
}
export declare function defaultConfig(options: ConfigOptions): ProviderType;
