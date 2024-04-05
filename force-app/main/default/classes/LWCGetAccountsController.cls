public with sharing class LWCGetAccountsController {
    @AuraEnabled
    public static List<Account> getAccounts(String searchText){
        try {
            if(String.isEmpty(searchText)){
                return [SELECT Id, Name FROM Account];
            }
            else{
                String sText = '%' + searchText + '%';
                return [SELECT Id, Name FROM Account WHERE Name LIKE :sText];
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}