import { LitElement } from 'lit';
export declare class W3mTransactionsView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private paginationObserver?;
    private address;
    private transactionsByYear;
    private loading;
    private empty;
    private next;
    constructor();
    firstUpdated(): void;
    updated(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private templateTransactionsByYear;
    private templateRenderTransaction;
    private templateTransactions;
    private templateEmpty;
    private templateLoading;
    private createPaginationObserver;
    private setPaginationObserver;
    private getTransactionListItemProps;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-transactions-view': W3mTransactionsView;
    }
}
