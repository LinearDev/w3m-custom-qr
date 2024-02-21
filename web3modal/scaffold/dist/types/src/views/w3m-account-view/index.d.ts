import { LitElement } from 'lit';
export declare class W3mAccountView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private address;
    private profileImage;
    private profileName;
    private network;
    private disconnecting;
    private balance;
    private balanceSymbol;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private onrampTemplate;
    private emailCardTemplate;
    private handleClickPay;
    private explorerBtnTemplate;
    private emailBtnTemplate;
    private isAllowedNetworkSwitch;
    private onCopyAddress;
    private onNetworks;
    private onTransactions;
    private onDisconnect;
    private onExplorer;
    private onGoToUpgradeView;
    private onGoToUpdateEmail;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-view': W3mAccountView;
    }
}
