public with sharing class LWCGetAccountsController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchText){
        try {
            if(String.isEmpty(searchText)){
                return [SELECT Id, Name FROM Account LIMIT 10];
            }
            else{
                String sText = '%' + searchText + '%';
                return [SELECT Id, Name FROM Account WHERE Name LIKE :sText];
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getAccountContacts(String accountId){
        try {
            return [SELECT Id, Name FROM CONTACT WHERE accountId=:accountId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}