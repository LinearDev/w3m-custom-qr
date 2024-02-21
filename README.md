# W3M Custom QR

### Usage

```js
import {createWeb3Modal, defaultConfig} from "w3m-custom-qr";
import "w3m-custom-qr/web3modal/ethers5/react";

export const w3m_nets = [
  {
    chainId: 56,
    name: 'BSC mainnet',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com/',
    rpcUrl: 'https://bsc-dataseed1.binance.org/'
  },
  {
    chainId: 97,
    name: 'BSC testnet',
    currency: 'tBNB',
    explorerUrl: 'https://testnet.bscscan.com/',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  },
];

createWeb3Modal({
  ethersConfig: defaultConfig({metadata: {
    name: 'test',
    description: 'test',
    url: 'https://example.com/',
    icons: ['https://example.com/icons/logo.png']
  }}),
  chains: w3m_nets,
  projectId: YOUR_PROJ_ID
})
```

### mobileBase

```js
mobileBase({
  name, 
  img,
  order,
  mobile_link
})
```

Generates a wallet object for a mobile wallet.

 * `name` - name of the wallet
 * `img` - logo image URL
 * `order` - display order
 * `mobile_link` - deep link to open wallet on mobile
 * Returns wallet object for use in wallet selector

### desktopBase

```js
desktopBase({
  img,
  name 
})
```

Generates a desktop wallet object.

 * `img` - logo image URL
 * `name` - wallet name
 * Returns desktop wallet object

### setInjected

```js
setInjected(bool)
```

Set to false if you don't want to show Metamask injected connector

### setWalletConnect

```js
setWalletConnect(bool)
```

Set to false if you don't want to show WalletConnect button

### walletBase

```js
walletBase(bases)
```

Sets additional wallets to the modal window

 * `bases` - array of wallet objects with mobileBase and/or desktopBase