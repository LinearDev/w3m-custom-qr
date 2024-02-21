import { LitElement } from 'lit';
export declare class W3mAccountSettingsView extends LitElement {
    static styles: import("lit").CSSResult;
    private usubscribe;
    private readonly networkImages;
    private address;
    private profileImage;
    private profileName;
    private balance;
    private balanceSymbol;
    private network;
    private disconnecting;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private onTransactions;
    private explorerBtnTemplate;
    private isAllowedNetworkSwitch;
    private onCopyAddress;
    private onNetworks;
    private onDisconnect;
    private onExplorer;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-settings-view': W3mAccountSettingsView;
    }
}
