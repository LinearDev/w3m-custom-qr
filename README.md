# W3M Custom QR

This library is a fork of [@web3modal/ethers5](https://www.npmjs.com/package/@web3modal/ethers5) with additional features to control the modal window itself, such as adding new wallet connection buttons, logos of networks.

![custom wallet connect window](https://lh3.googleusercontent.com/fife/AGXqzDmu0rmbgiMvre9U0D7f_x9LDiOV9LtoUFYvcZcsYMl1uTnlPYcPY6GhxMGyO436YyihHEDE-6Wv_oN_-ABzy7l-Ysu93Q1JGLqK9bUsEbtRJCrf6ORjMAyJVOPhKbneN4Az4hpNc9MKnWfTcwTGQUayUjrgBlCthOSsF4m9T5WAPV6RslS-ZdvP1DzV_UbvCcGK6QL5eB7ZV2SXEyD52RGV1krskf64QDsvubRJk7Dw0YhF0oCvnqYupwBgVWcO3n1WxM9KjsrHdiuAKGQ9NLFoCvH_dtTD84dJy48I1u6fJ9H4mi3z5aMAO4ICfO3rsbUWC7anpNKQTbtanUKp_TJRPrMPUhkXTgmYOa50EtFSLCoNiZ9LzmazxvZzLz4eyDtk1R9ZwC5yQBtaomh2n75P6hVEaasqlntFScmsslZvf2n_yzSG0hgKVtyP9E2br7ITS0SnOcnX13UuAT9hoBOj1m7ZSU2egHojreAr32Ys5m6jlw-Zh8BpiSB9lW545KgNjdJdrNppEimuHqUF_HwuRFpOQI68MPuOQIV-L07ahgveGipBNSF_3VLXwYk6K_hBHQoKtA7ZZ4ZhyR8DhZSkn7hrg4BFbcY_ANga9PeKWuLymd8wBW19weYVrQNDRv1EsxnMNBenDiccE6VM1UFl0vhRwj_7yNQlytIG9vh8IIBVPafRKmG3sKD8gJr7e09jxUjQhKoFA6ybHLyIUvH8O7AzQSEaRm_XAxgNiaZJKSqoukiQiE55xLJs_WRVdTURHAhoGnZ8iSx3LpaAOjm7NM3zg8jU0cHqjd1qORCWP_36pAGHVJMQ2aTj4tE9t8IV6Eo3VriW1isI0ZOEVuEGvGZRdlilAX00gnW40HNud8ERn84r9PH1r_M_GfJF80aJViAxvGyOx4RIOlc3VtraV0gccIAMQ_78MRys5Nxxa0uAOvN2XPOUrSorb0TkdWl020jKIUjP_bIC5p6dJ2gTPesSGKskguVWcUQ_UTOMgpXXsHrF8zi7XakIGQsDPDJ8jAd4kXqQYowa5CdFgNqROV2-cYlqbdNyeWLZkCitEsaj8Y25XBbl8ICYISOPjzl1Un_RZJrSm8HsQnmYDh3P97nL-BMJiaj5eq1AwX9NBDLaHoILnWf_E_iihn57MYDkAZOwCt1UPW7dUVlBl2qm5AEJ7VKYwxCuD-kUdhWmCN3sBdoOwHljPLy-hEfbqw7b3nWWLqBGg6uzIRvtqiBfZXmIauNl39pm8L36HuukZjz9-Zgp2BiYs1jafNEIjLhG5ATe-Oew3a76vwglsTZGtQkJS4maKBX6cWpaIezzSjidOeyYPnCGLTOrPJ0j-zCeTHa9gjqKHBhnKyM2ObPuesWeqCe4jeu9BW9O0dYTbRRELfucqqmA4WQhzVnzu_w2omiSO5G-1LhSn2PTuixijs3F3K_YyTt0f8Ed_-bs7SJfZXRgX4RMLJ4mMwtAn7ZowG94CVhYpervmdbgrcou7GPwkzOf9w_fpgV4tfpsOCBwHZNAawDajNcirm0GalxMx69maFMRZ_mH6sOIH3LAaNoDjwy6w81BVZIx6muzx0AM9kzBcqTgv6XPRdrSuB9VRmFIzcTGGZG2YsSsqwP0Yzb4S2WtRN81rD4G1V52_7nJPrYbK14THtLfnkiZL7rHANa9Nul42M6IqzaJo6brs68M=w2880-h1558)

### Usage

```js
import {createWeb3Modal, defaultConfig} from "w3m-custom-qr/ethers5";
import { walletBase, desktopBase, mobileBase } from 'w3m-custom-qr';
import "w3m-custom-qr/react";

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

const customWallet = {
  mobile: mobileBase({
    name: "Custom Mobile", 
    img: "",
    order: 10,
    mobile_link: "metamask://"
  }),
  desktop: desktopBase({
    img: "",
    name: "Custom  Desktop"
  })
}

walletBase([customWallet])

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

### setAllWallets

```js
setAllWallets(bool)
```

Set to true if you want to show "All Wallets" button

### setRecentWallets

```js
setRecentWallets(bool)
```

Set to true if you want to show an additional position in the list for recently used wallets

### walletBase

```js
walletBase(bases)
```

Sets additional wallets to the modal window

 * `bases` - array of wallet objects with mobileBase and/or desktopBase

### setCustomImage

```js
setCustomImage({ id: "eip155:1", imageUrl: "https://example.com/logo.png" })
```

Adds a logo image for the exact chain ID specified in the `id` key of the passed object