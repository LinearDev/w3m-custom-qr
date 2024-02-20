
globalThis.isInjected = true;
globalThis.isWalletConnect = true;

const injectedBase = (ids) => {
    return ids.map((id) => {return {
        "namespace": "eip155",
        "injected_id": id
    }})
}

/**
 * 
 * @param {*} param0 - {
 *  name - wallet name
 *  img - logo image
 *  order - order in which we paste the buttons
 *  mobile_link - link to call app on phone
 * }
 * @returns object base of mobile wallet connection
 */
export const mobileBase = ({
    name,
    img,
    order,
    mobile_link
}) => {
    return {
        "id": "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
        "name": name,
        "homepage": "https://metamask.io/",
        "image_id": img,
        "img": img,
        "order": order,
        "mobile_link": mobile_link,
        "desktop_link": null,
        "webapp_link": null,
        "app_store": "https://apps.apple.com/us/app/metamask/id1438144202",
        "play_store": "https://play.google.com/store/apps/details?id=io.metamask",
        "rdns": "io.metamask",
        "chrome_store": "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "injected": injectedBase(["isMetaMask"])
    }
}

/**
 * 
 * @param {*} param0 - {
 *  img - wallet image
 *  name - wallet name
 * }
 * @returns object with base of desktop wallet type
 */
export const desktopBase = ({
    img,
    name
}) => {
    return {
        explorerId: undefined,
        id: "walletConnect",
        imageId: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
        imageUrl: img,
        name: name,
        type: "WALLET_CONNECT"
    }
}

export const setInjected = (bool) => {
    globalThis.isInjected = bool
}

export const setWalletConnect = (bool) => {
    globalThis.isWalletConnect = bool
}

/**
 * 
 * [{
 *  mobile - mobileBase
 *  desktop - desktopBase
 * }]
 */
export const walletBase = (b) => {
    globalThis.wallets = b
}