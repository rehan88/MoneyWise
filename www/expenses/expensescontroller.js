(function () {
      'use strict'

      angular.module('app.expenses').controller('expensescontroler', expensescontroler);
      expensescontroler.$inject = ["$scope", "$stateParams", "$location", "Accounts", "Expenses"];

      function expensescontroler($scope, $stateParams, $location, Accounts, Expenses) {

            $scope.expenseFormData = {};
            $scope.accountId = $stateParams.accountid;
            $scope.accountName = "";
  
            $scope.populateAccount = function () {
                  Accounts.get($scope.accountId).then(function (account) {
                        $scope.accountName = account.accountname;
                  });
            };
                        
            $scope.onSwipeRight = function (account) {
                  $location.url("app/accounts");
            };

            $scope.submitExpense = function () {
                  $scope.newExpense = { 
                        'item': $scope.expenseFormData.purchaseItem, 
                        'amountspent': $scope.expenseFormData.amountSpent, 
                        'datespent' : new Date().toLocaleDateString()
                        };
                  
                  Expenses.add($scope.newExpense);      
                  
            };
            
            $scope.populateAccount();
      };
})();