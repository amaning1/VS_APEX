import { LightningElement } from 'lwc';

export default class AccountSearchCard extends LightningElement {

    searchText = '';
    searchAccountContactHandler(event){
        this.searchText = event.detail;

    }
    

    // constructor(){
    //     super();
    //     this.template.addEventListener('searchaccountcontact',this.searchAccountContactHandler)
    // }
}
