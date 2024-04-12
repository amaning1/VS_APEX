import { LightningElement,wire } from 'lwc';
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
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
    editableContactId = '';
    showModal = false;

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

    
    editButtonHandler(event){
        this.editableContactId = event.target.dataset.contactId;
        this.showModal = true;
    }

   async deleteButtonHandler(event){
    let contactId = event.target.dataset.contactId;
        const result = await LightningConfirm.open({
            message: 'Are you sure you want to delete this contact',
            variant: 'headerless',
            label: 'Confirm Deletion',
            // setting theme would have no effect

        });
        if (result){
            let deleted =  await deleteRecord(contactId);
            this.showToast();
            this.getContacts();
        }
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleAccountSelection(data) {
        this.accountId = data.accountId;
        this.title = `${data.accountName}'s Contacts`;
        this.getContacts();
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    closeModalHandler(){
        this.showModal = false;
        this.editableContactId = null;
    }
    successHandler(){
        this.closeModalHandler();
        this.getContacts();
    }

    addButtonHandler(){
        this.showModal = true;

    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Contact Deleted',
            message:'Contact Deleted Successfully',
        variant: 'success'      });
        this.dispatchEvent(event);
    }

}