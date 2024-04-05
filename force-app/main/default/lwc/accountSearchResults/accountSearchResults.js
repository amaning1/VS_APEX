import { LightningElement,api} from 'lwc';
import getAccounts  from '@salesforce/apex/LWCGetAccountsController.getAccounts';

export default class AccountSearchResults extends LightningElement {

    @api searchText

} 