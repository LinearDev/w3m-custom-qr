var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConnectionController, CoreHelperUtil, EventsController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
let W3mConnectingWcMobile = class W3mConnectingWcMobile extends W3mConnectingWidget {
    constructor() {
        super();
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-mobile: No wallet provided');
        }
        this.onConnect = this.onConnectProxy.bind(this);
        this.onRender = this.onRenderProxy.bind(this);
        document.addEventListener('visibilitychange', this.onBuffering.bind(this));
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'mobile' }
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('visibilitychange', this.onBuffering.bind(this));
    }
    onRenderProxy() {
        if (!this.ready && this.uri) {
            this.ready = true;
            this.onConnect?.();
        }
    }
    onConnectProxy() {
        if (this.wallet?.mobile_link && this.uri) {
            try {
                this.error = false;
                const { mobile_link, name } = this.wallet;
                const { redirect, href } = CoreHelperUtil.formatNativeUrl(mobile_link, this.uri);
                ConnectionController.setWcLinking({ name, href });
                ConnectionController.setRecentWallet(this.wallet);
                CoreHelperUtil.openHref(redirect, '_self');
            }
            catch {
                this.error = true;
            }
        }
    }
    onBuffering() {
        const isIos = CoreHelperUtil.isIos();
        if (document?.visibilityState === 'visible' && !this.error && isIos) {
            ConnectionController.setBuffering(true);
            setTimeout(() => {
                ConnectionController.setBuffering(false);
            }, 5000);
        }
    }
};
W3mConnectingWcMobile = __decorate([
    customElement('w3m-connecting-wc-mobile')
], W3mConnectingWcMobile);
export { W3mConnectingWcMobile };