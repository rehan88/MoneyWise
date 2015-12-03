(function () {
      'use strict'

      angular.module('app.expenses').controller('expensescontroler', expensescontroler);
      expensescontroler.$inject = ["$scope", "$stateParams", "$location", "Accounts", "Expenses"];

      function expensescontroler($scope, $stateParams, $location, Accounts, Expenses) {

            $scope.expenses = [];
            $scope.expenseFormData = {};
            $scope.accountId = $stateParams.accountid;
            $scope.accountName = "";

            $scope.populateAccount = function () {
                  Accounts.get($scope.accountId).then(function (account) {
                        $scope.accountName = account.accountname;
                  });
            };

            $scope.populateAllExpenses = function () {
                  Expenses.get($scope.accountId).then(function (expenses) {
                        angular.forEach(expenses, function (expense) {
                              $scope.expenses.push(expense);
                        });
                        $scope.expenses = expenses;                        
                  });
            };

            $scope.onSwipeRight = function (account) {
                  $location.url("app/accounts");
            };

            $scope.submitExpense = function () {
                  $scope.newExpense = {
                        'item': $scope.expenseFormData.purchaseItem,
                        'amountspent': $scope.expenseFormData.amountSpent,
                        'datespent': new Date().toLocaleDateString(),
                        'accountid': $scope.accountId
                  };
                  Expenses.add($scope.newExpense);
                  $scope.populateAllExpenses();
            };

            $scope.populateAccount();
            $scope.populateAllExpenses();
      };
})();