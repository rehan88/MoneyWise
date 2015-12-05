(function () {
      'use strict'

      angular.module('app.expenses').controller('expensescontroler', expensescontroler);
      expensescontroler.$inject = ["$scope", "$stateParams", "$location", "Accounts", "Expenses", "ionicToast"];

      function expensescontroler($scope, $stateParams, $location, Accounts, Expenses, ionicToast) {

            $scope.allExpenses = [];
            $scope.expenseFormData = {};
            $scope.accountId = $stateParams.accountid;
            $scope.accountName = "";
            $scope.showAddNewExpenseBtn = true;
                        
            $scope.showSubmitToast = function (toastType) {
                  if (toastType === "success") {
                        ionicToast.show('Expense added.', 'bottom', false, 2500);
                  }
            };

            $scope.showRequiredToast = function (field) {
                  ionicToast.show('Please enter' + field, 'bottom', false, 2500);
            };

            $scope.populateAccount = function () {
                  Accounts.get($scope.accountId).then(function (account) {
                        $scope.accountName = account.accountname;
                  });
            };

            $scope.populateAllExpenses = function () {
                  Expenses.get($scope.accountId).then(function (expenses) {
                        $scope.allExpenses = expenses;
                  });
            };

            $scope.onSwipeRight = function (account) {
                  $location.url("app/accounts");
            };

            $scope.showAddNewExpense = function () {
                  $scope.focusInputPurchaseItem = true;
                  $scope.hideExpneseInput = true;
                  $scope.showAddNewExpenseBtn = false;
            };

            $scope.hideAddExpense = function () {
                  $scope.focusInputPurchaseItem = false;
                  $scope.showAddNewExpenseBtn = true;
                  $scope.hideExpneseInput = false;
            };

            $scope.submitExpense = function () {
                  if ($scope.expenseFormData.purchaseItem === undefined || $scope.expenseFormData.purchaseItem === "") {
                        $scope.showRequiredToast(" a purchase item");
                        return false;
                  }
                  if ($scope.expenseFormData.amountSpent === undefined || $scope.expenseFormData.amountSpent === "") {
                        $scope.showRequiredToast(" the amount spent");
                        return false;
                  }
                  $scope.newExpense = {
                        'item': $scope.expenseFormData.purchaseItem,
                        'amountspent': $scope.expenseFormData.amountSpent,
                        'datespent': new Date().toLocaleDateString(),
                        'accountid': $scope.accountId
                  };
                  Expenses.add($scope.newExpense);
                  $scope.populateAllExpenses();
                  $scope.hideExpneseInput = false;
                  $scope.showAddNewAccountBtn = true;
                  $scope.expenseFormData.purchaseItem = "";
                  $scope.expenseFormData.amountSpent = "";
                  $scope.showSubmitToast("success");
            };

            $scope.populateAccount();
            $scope.populateAllExpenses();
      };
})();