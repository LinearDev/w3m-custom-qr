type InjectedBaseType = {
    "namespace": "eip155",
    "injected_id": string
};

export declare function injectedBase (ids: string[]): InjectedBaseType[];

type walletUrls =  "metamask://" | "trustwallet://"

type mobile = {
    name: string,
    img: string,
    order: number,
    mobile_link: walletUrls
}

type mobileBaseType = {
    "id": string,
    "name": string,
    "homepage": string,
    "image_id": string,
    "img": string,
    "order": number,
    "mobile_link": string,
    "desktop_link": null,
    "webapp_link": null,
    "app_store": string,
    "play_store": string,
    "rdns": string,
    "chrome_store": string,
    "injected": InjectedBaseType[]
}

export declare function mobileBase ({
    name,
    img,
    order,
    mobile_link
}: mobile): mobileBaseType

type desktop = {
    img: string,
    name: string
}

type DesktopBaseType = {
    explorerId: undefined,
    id: string,
    imageId: string,
    imageUrl: string,
    name: string,
    type: string
}
export declare function desktopBase ({
    img,
    name
}: desktop): DesktopBaseType

type wallet = {
    mobile: mobile,
    desktop: desktop
}
export declare function walletBase (b: wallet[]): void

export * from "./web3modal/ethers5/dist/types/exports/index";
export * from "./web3modal/ethers5/dist/types/exports/react";
export * from "./web3modal/ethers5/dist/types/exports/vue";
export * from "./web3modal/ethers5/dist/types/src/client";
export * from "./web3modal/ethers5/dist/types/src/utils/defaultConfig";
export * from "./web3modal/scaffold/dist/types/index";