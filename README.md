# W3M Custom QR

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