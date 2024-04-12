import { LightningElement,api,wire } from 'lwc';

import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import viewAccountContactsChannel from '@salesforce/messageChannel/viewAccountContactsChannel__c';
import getAccountContacts from '@salesforce/apex/LWCGetAccountsController.getAccountContacts';

export default class AccountContacts extends LightningElement {
    subscription=null;
    accountId='';
    @wire(MessageContext)
    messageContext;
    title='Contacts';
    contacts = [];

    async getContacts(){
        const data = await getAccountContacts({accountId: this.accountId});
        this.contacts = data;
    }

    get isAccountSelected(){
        return this.accountId?true:false;
    }

    get hasContacts(){
        return this.contacts?.length > 0;
    }

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                viewAccountContactsChannel,
                (data) => this.handleAccountSelection(data),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleAccountSelection(data) {
        this.accountId = data.accountId;
        this.title = ' ${data.accountName}\'s Contacts';
        this.getContacts();
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

}