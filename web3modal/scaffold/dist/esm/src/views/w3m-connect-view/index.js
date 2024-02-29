var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApiController, AssetUtil, ConnectionController, ConnectorController, ConstantsUtil, CoreHelperUtil, EventsController, OptionsController, RouterController, StorageUtil } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './styles.js';

let W3mConnectView = class W3mConnectView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.connectors = ConnectorController.state.connectors;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
      let connectors = [];
        if (globalThis.wallets) {
          connectors = globalThis.wallets;
        }
        return html `
      <wui-flex flexDirection="column" padding="s" gap="xs">
        <w3m-email-login-widget></w3m-email-login-widget>

        ${globalThis.isWalletConnect ? this.walletConnectConnectorTemplate() : null}
        ${globalThis.isInjected ? this.announcedTemplate() : null}
        ${globalThis.isRecent ? this.recentTemplate() : null}
        ${connectors.map((entry) => {
          return this.customButton(CoreHelperUtil.isMobile() ? entry.mobile : entry.desktop)
        })}

        ${globalThis.isAllWallets ? this.allWalletsTemplate() : null}
        
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    /**
     * recomended list (metamask and trust wallet)
     * 
     * ${this.recommendedTemplate()}
     */
    /**
     * wallet connect button (pc only)
     * 
     * ${this.walletConnectConnectorTemplate()}
     */
    /**
     * "Browser wallet" button (only if has injected wallet)
     * 
     * ${this.injectedTemplate()}
     */
    /**
     * nothing
     * 
     * ${this.externalTemplate()}
     * ${this.customTemplate()}
     * ${this.featuredTemplate()}
     */
    /**
     * "metamask" button (only if has browser plugin)
     * 
     * ${this.announcedTemplate()}
     */
    /**
     * recent wallets (if has one)
     * 
     * ${this.recentTemplate()}
     */
    /**
     * "All wallets" button (shows all wallets)
     * 
     * ${this.allWalletsTemplate()}
     */
    }
    walletConnectConnectorTemplate() {
        if (CoreHelperUtil.isMobile()) {
            return null;
        }
        const connector = this.connectors.find(c => c.type === 'WALLET_CONNECT');
        if (!connector) {
            return null;
        }
        return html `
      <wui-list-wallet
        imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
        name=${connector.name ?? 'Unknown'}
        @click=${() => this.onConnector(connector)}
        tagLabel="qr code"
        tagVariant="main"
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `;
    }
    customTemplate() {
        const { customWallets } = OptionsController.state;
        if (!customWallets?.length) {
            return null;
        }
        const wallets = this.filterOutDuplicateWallets(customWallets);
        return wallets.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
        >
        </wui-list-wallet>
      `);
    }

    /**
     * creates button with custom params
     * @param {*} param0 
     * @returns 
     */
    customButton(wallet) {
      const onConnection = () => {
        CoreHelperUtil.isMobile() ? this.onConnectWallet(wallet) : this.onConnector(wallet)
      }

      return html `
        <wui-list-wallet
          imageSrc=${wallet.img || wallet.imageUrl}
          name=${wallet.name ?? 'Unknown'}
          @click=${onConnection}
        >
        </wui-list-wallet>
      `;
    }

    featuredTemplate() {
        const connector = this.connectors.find(c => c.type === 'WALLET_CONNECT');
        if (!connector) {
            return null;
        }
        const { featured } = ApiController.state;
        if (!featured.length) {
            return null;
        }
        const wallets = this.filterOutDuplicateWallets(featured);
        return wallets.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
        >
        </wui-list-wallet>
      `);
    }
    recentTemplate() {
        const recent = StorageUtil.getRecentWallets();
        return recent.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
          tagLabel="recent"
          tagVariant="shade"
        >
        </wui-list-wallet>
      `);
    }
    announcedTemplate() {
        return this.connectors.map(connector => {
            if (connector.type !== 'ANNOUNCED') {
                return null;
            }
            return html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
          name=${connector.name ?? 'Unknown'}
          @click=${() => this.onConnector(connector)}
          tagVariant="success"
          .installed=${true}
        >
        </wui-list-wallet>
      `;
        });
    }
    injectedTemplate() {
        return this.connectors.map(connector => {
            if (connector.type !== 'INJECTED') {
                return null;
            }
            if (!ConnectionController.checkInstalled()) {
                return null;
            }
            return html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
          .installed=${true}
          name=${connector.name ?? 'Unknown'}
          @click=${() => this.onConnector(connector)}
        >
        </wui-list-wallet>
      `;
        });
    }
    externalTemplate() {
        const announcedRdns = ConnectorController.getAnnouncedConnectorRdns();
        return this.connectors.map(connector => {
            if (['WALLET_CONNECT', 'INJECTED', 'ANNOUNCED', 'EMAIL'].includes(connector.type)) {
                return null;
            }
            if (announcedRdns.includes(ConstantsUtil.CONNECTOR_RDNS_MAP[connector.id])) {
                return null;
            }
            return html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
          name=${connector.name ?? 'Unknown'}
          @click=${() => this.onConnector(connector)}
        >
        </wui-list-wallet>
      `;
        });
    }
    allWalletsTemplate() {
        const connector = this.connectors.find(c => c.type === 'WALLET_CONNECT');
        const { allWallets } = OptionsController.state;
        if (!connector || allWallets === 'HIDE') {
            return null;
        }
        if (allWallets === 'ONLY_MOBILE' && !CoreHelperUtil.isMobile()) {
            return null;
        }
        const count = ApiController.state.count;
        const featuredCount = ApiController.state.featured.length;
        const rawCount = count + featuredCount;
        const roundedCount = rawCount < 10 ? rawCount : Math.floor(rawCount / 10) * 10;
        const tagLabel = roundedCount < rawCount ? `${roundedCount}+` : `${roundedCount}`;
        return html `
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${tagLabel}
        tagVariant="shade"
        data-testid="all-wallets"
      ></wui-list-wallet>
    `;
    }
    recommendedTemplate() {
        const connector = this.connectors.find(c => c.type === 'WALLET_CONNECT');
        if (!connector) {
            return null;
        }
        const { recommended } = ApiController.state;
        const { customWallets, featuredWalletIds } = OptionsController.state;
        const { connectors } = ConnectorController.state;
        const recent = StorageUtil.getRecentWallets();
        const injected = connectors.filter(c => c.type === 'INJECTED');
        const filteredInjected = injected.filter(i => i.name !== 'Browser Wallet');
        if (featuredWalletIds || customWallets || !recommended.length) {
            return null;
        }
        const overrideLength = filteredInjected.length + recent.length;
        const maxRecommended = Math.max(0, 2 - overrideLength);
        const wallets = this.filterOutDuplicateWallets(recommended).slice(0, maxRecommended);
        return wallets.map(wallet => html `
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
          name=${wallet?.name ?? 'Unknown'}
          @click=${() => this.onConnectWallet(wallet)}
        >
        </wui-list-wallet>
      `);
    }
    onConnector(connector) {
        if (connector.type === 'WALLET_CONNECT') {
            if (CoreHelperUtil.isMobile()) {
                RouterController.push('AllWallets');
            }
            else {
                RouterController.push('ConnectingWalletConnect');
            }
        }
        else {
            RouterController.push('ConnectingExternal', { connector });
        }
    }
    filterOutDuplicateWallets(wallets) {
        const recent = StorageUtil.getRecentWallets();
        const recentIds = recent.map(wallet => wallet.id);
        const filtered = wallets.filter(wallet => !recentIds.includes(wallet.id));
        return filtered;
    }
    onAllWallets() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_ALL_WALLETS' });
        RouterController.push('AllWallets');
    }
    onConnectWallet(wallet) {
        RouterController.push('ConnectingWalletConnect', { wallet });
    }
};
W3mConnectView.styles = styles;
__decorate([
    state()
], W3mConnectView.prototype, "connectors", void 0);
W3mConnectView = __decorate([
    customElement('w3m-connect-view')
], W3mConnectView);
export { W3mConnectView };