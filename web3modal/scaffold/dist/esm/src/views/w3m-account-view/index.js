var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AccountController, CoreHelperUtil, ModalController, NetworkController, RouterController, AssetUtil, StorageUtil, ConnectorController, EventsController, ConnectionController, SnackController, ConstantsUtil, OptionsController } from '@web3modal/core';
import { UiHelperUtil, customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './styles.js';
let W3mAccountView = class W3mAccountView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.address = AccountController.state.address;
        this.profileImage = AccountController.state.profileImage;
        this.profileName = AccountController.state.profileName;
        this.network = NetworkController.state.caipNetwork;
        this.disconnecting = false;
        this.balance = AccountController.state.balance;
        this.balanceSymbol = AccountController.state.balanceSymbol;
        this.unsubscribe.push(...[
            AccountController.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileImage = val.profileImage;
                    this.profileName = val.profileName;
                    this.balance = val.balance;
                    this.balanceSymbol = val.balanceSymbol;
                }
                else {
                    ModalController.close();
                }
            })
        ], NetworkController.subscribeKey('caipNetwork', val => {
            if (val?.id) {
                this.network = val;
            }
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-account-view: No account provided');
        }
        const networkImage = AssetUtil.getNetworkImage(this.network);
        const customImage = globalThis.networks[this.network?.id || ""]

        return html `
      <wui-flex
        flexDirection="column"
        .padding=${['0', 'xl', 'm', 'xl']}
        alignItems="center"
        gap="l"
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${ifDefined(this.profileImage === null ? undefined : this.profileImage)}
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="medium-title-600" color="fg-100">
              ${this.profileName
            ? UiHelperUtil.getTruncateString({
                string: this.profileName,
                charsStart: 20,
                charsEnd: 0,
                truncate: 'end'
            })
            : UiHelperUtil.getTruncateString({
                string: this.address,
                charsStart: 4,
                charsEnd: 4,
                truncate: 'middle'
            })}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
          <wui-text variant="paragraph-500" color="fg-200"
            >${CoreHelperUtil.formatBalance(this.balance, this.balanceSymbol)}</wui-text
          >
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${['0', 's', 's', 's']}>
        ${this.emailCardTemplate()} ${this.emailBtnTemplate()}

        <wui-list-item
          .variant=${customImage || networkImage ? 'image' : 'icon'}
          iconVariant="overlay"
          icon="networkPlaceholder"
          imageSrc=${customImage ? customImage : ifDefined(networkImage)}
          ?chevron=${this.isAllowedNetworkSwitch()}
          @click=${this.onNetworks.bind(this)}
          data-testid="w3m-account-select-network"
        >
          <wui-text variant="paragraph-500" color="fg-100">
            ${this.network?.name ?? 'Unknown'}
          </wui-text>
        </wui-list-item>
        ${this.onrampTemplate()}
        <wui-list-item
          iconVariant="blue"
          icon="swapHorizontalMedium"
          iconSize="sm"
          ?chevron=${true}
          @click=${this.onTransactions.bind(this)}
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${false}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `;
    }
    onrampTemplate() {
        const { enableOnramp } = OptionsController.state;
        if (!enableOnramp) {
            return null;
        }
        return html `
      <wui-list-item
        iconVariant="blue"
        icon="add"
        ?chevron=${true}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy</wui-text>
      </wui-list-item>
    `;
    }
    emailCardTemplate() {
        const type = StorageUtil.getConnectedConnector();
        const emailConnector = ConnectorController.getEmailConnector();
        const { origin } = location;
        if (!emailConnector || type !== 'EMAIL' || origin.includes(ConstantsUtil.SECURE_SITE)) {
            return null;
        }
        return html `
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
      ></wui-notice-card>
    `;
    }
    handleClickPay() {
        RouterController.push('OnRampProviders');
    }
    explorerBtnTemplate() {
        const { addressExplorerUrl } = AccountController.state;
        if (!addressExplorerUrl) {
            return null;
        }
        return html `
      <wui-button size="sm" variant="shade" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `;
    }
    emailBtnTemplate() {
        const type = StorageUtil.getConnectedConnector();
        const emailConnector = ConnectorController.getEmailConnector();
        if (!emailConnector || type !== 'EMAIL') {
            return null;
        }
        const email = emailConnector.provider.getEmail() ?? '';
        return html `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="mail"
        iconSize="sm"
        ?chevron=${true}
        @click=${() => this.onGoToUpdateEmail(email)}
      >
        <wui-text variant="paragraph-500" color="fg-100">${email}</wui-text>
      </wui-list-item>
    `;
    }
    isAllowedNetworkSwitch() {
        const { requestedCaipNetworks } = NetworkController.state;
        const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
        const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id);
        return isMultiNetwork || !isValidNetwork;
    }
    onCopyAddress() {
        try {
            if (this.address) {
                CoreHelperUtil.copyToClopboard(this.address);
                SnackController.showSuccess('Address copied');
            }
        }
        catch {
            SnackController.showError('Failed to copy');
        }
    }
    onNetworks() {
        if (this.isAllowedNetworkSwitch()) {
            EventsController.sendEvent({ type: 'track', event: 'CLICK_NETWORKS' });
            RouterController.push('Networks');
        }
    }
    onTransactions() {
        EventsController.sendEvent({ type: 'track', event: 'CLICK_TRANSACTIONS' });
        RouterController.push('Transactions');
    }
    async onDisconnect() {
        try {
            this.disconnecting = true;
            await ConnectionController.disconnect();
            EventsController.sendEvent({ type: 'track', event: 'DISCONNECT_SUCCESS' });
            ModalController.close();
        }
        catch {
            EventsController.sendEvent({ type: 'track', event: 'DISCONNECT_ERROR' });
            SnackController.showError('Failed to disconnect');
        }
        finally {
            this.disconnecting = false;
        }
    }
    onExplorer() {
        const { addressExplorerUrl } = AccountController.state;
        if (addressExplorerUrl) {
            CoreHelperUtil.openHref(addressExplorerUrl, '_blank');
        }
    }
    onGoToUpgradeView() {
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_UPGRADE_FROM_MODAL' });
        RouterController.push('UpgradeEmailWallet');
    }
    onGoToUpdateEmail(email) {
        RouterController.push('UpdateEmailWallet', { email });
    }
};
W3mAccountView.styles = styles;
__decorate([
    state()
], W3mAccountView.prototype, "address", void 0);
__decorate([
    state()
], W3mAccountView.prototype, "profileImage", void 0);
__decorate([
    state()
], W3mAccountView.prototype, "profileName", void 0);
__decorate([
    state()
], W3mAccountView.prototype, "network", void 0);
__decorate([
    state()
], W3mAccountView.prototype, "disconnecting", void 0);
__decorate([
    state()
], W3mAccountView.prototype, "balance", void 0);
__decorate([
    state()
], W3mAccountView.prototype, "balanceSymbol", void 0);
W3mAccountView = __decorate([
    customElement('w3m-account-view')
], W3mAccountView);
export { W3mAccountView };