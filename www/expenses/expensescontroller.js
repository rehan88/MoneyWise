(function () {
    'use strict'

    angular.module('app.expenses').controller('expensescontroler', expensescontroler);
    expensescontroler.$inject = ["$scope", "$stateParams", "$location", "Accounts", "Expenses", "ionicToast"];

    function expensescontroler($scope, $stateParams, $location, Accounts, Expenses, ionicToast) {

        $scope.britishDateFormat = function () {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();            
            $scope.todaysDate = day + "/" + month + "/" + year;
        };
        
        $scope.accountDetails = {};
        $scope.allExpenses = [];
        $scope.indexedExpenses = [];
        $scope.accountId = $stateParams.accountid;
        $scope.accountName = "";
        $scope.showAddNewExpenseBtn = true;
        $scope.todaysDate = "";       
        $scope.britishDateFormat();                
        $scope.expenseFormData = {
            'purchaseItem': "",
            'amountSpent': "",
            'datespent': $scope.todaysDate,
            'accountid': $scope.accountId
        };        

        $scope.expensesToFilter = function () {
            $scope.indexedExpenses = [];
            return $scope.allExpenses;
        };

        $scope.filterExpenses = function (expense) {
            var dateIsDifferent = $scope.indexedExpenses.indexOf(expense.datespent) == -1;
            if (dateIsDifferent) {
                $scope.indexedExpenses.push(expense.datespent);
            }
            return dateIsDifferent;
        };

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
                $scope.accountDetails = account;
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
            $scope.addExpense = true;
            $scope.hideExpenseAccountTitle = true;
        };

        $scope.hideAddExpense = function () {
            $scope.addExpense = false;
            $scope.focusInputPurchaseItem = false;
            $scope.showAddNewExpenseBtn = true;
            $scope.hideExpneseInput = false;
        };

        $scope.updateBalance = function (expense) {
            $scope.oldAccountDetails = $scope.accountDetails;
            $scope.accountDetails.balance = $scope.accountDetails.balance - expense;
            Accounts.update($scope.accountDetails, $scope.oldAccountDetails);
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
            Expenses.add($scope.expenseFormData);
            $scope.addExpense = false;
            $scope.showAddNewExpenseBtn = true;
            $scope.hideExpneseInput = false;
            $scope.updateBalance($scope.expenseFormData.amountSpent);
            $scope.expenseFormData.purchaseItem = "";
            $scope.expenseFormData.amountSpent = "";
            $scope.showSubmitToast("success");
            $scope.populateAllExpenses();
        };

        $scope.populateAccount();
        $scope.populateAllExpenses();
    };
})();