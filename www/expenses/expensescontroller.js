(function(){
      'use strict'

angular.module('app.expenses').controller('expensescontroler',expensescontroler); 
expensescontroler.$inject = ["$scope", "$stateParams", "$location", "Accounts"];

function expensescontroler($scope, $stateParams, $location, Accounts) {        
            
      $scope.expenseFormData = {};
      $scope.accountId = $stateParams.accountid;
      $scope.accountName = "";
      
       $scope.populateAccount = function () {
        Accounts.get($scope.accountId).then(function (account) {
        $scope.accountName = account.accountname;        
        });
      };
      
      $scope.populateAccount();
      
      $scope.onSwipeRight = function(account) {
        $location.url("app/accounts");        
      };        
      
      $scope.submitExpense = function () {
         $scope.newExpense = { 'purchaseItem': $scope.expenseFormData.purchaseItem, 'amountSpent': $scope.expenseFormData.amountSpent };         
      };
};
})();