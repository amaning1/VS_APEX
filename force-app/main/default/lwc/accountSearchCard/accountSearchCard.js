

import { LightningElement } from 'lwc';

export default class AccountSearchCard extends LightningElement {
searchText = '';

    accountNameChangeHandler(event){
        this.searchText = event.target.value;
    }

    searchClickHandler(){
        const event = new CustomEvent('searchaccountcontact', {detail:this.searchText});
        this.dispatchEvent(event);
    }
} 