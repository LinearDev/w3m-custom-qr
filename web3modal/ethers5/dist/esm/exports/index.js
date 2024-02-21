import { Web3Modal } from '../src/client.js';
import { ConstantsUtil } from '../../../../scaffold-utils/dist/esm/exports/index.js';
export { defaultConfig } from '../src/utils/defaultConfig.js';
export function createWeb3Modal(options) {
    return new Web3Modal({ ...options, _sdkVersion: `html-ethers5-${ConstantsUtil.VERSION}` });
}