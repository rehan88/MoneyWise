(function () {
    'use strict'

    angular.module('app.expenses').controller('expensescontroler', expensescontroler);
    expensescontroler.$inject = ["$scope", "$stateParams", "$location", "$ionicModal", "Accounts", "Expenses", "ionicToast"];

    function expensescontroler($scope, $stateParams, $location, $ionicModal, Accounts, Expenses, ionicToast) {

        $scope.accountDetails = {};
        $scope.allExpenses = [];
        $scope.indexedExpenses = [];
        $scope.accountId = $stateParams.accountid;
        $scope.accountName = "";
        $scope.todaysDate = "";

        $scope.britishDateFormat = function () {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            $scope.todaysDate = day + "/" + month + "/" + year;
        };

        $scope.britishDateFormat();
        $scope.expenseFormData = {
            'purchaseItem': "",
            'amountSpent': "",
            'datespent': $scope.todaysDate,
            'accountid': $scope.accountId
        };

        $ionicModal.fromTemplateUrl('expenses/addmodal/add-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.Modal = modal;
        });

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

        $scope.showRequiredToast = function () {
            ionicToast.show('All fields are required','bottom', false, 3000);
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

        $scope.updateBalance = function (expense) {
            $scope.oldAccountDetails = $scope.accountDetails;
            $scope.accountDetails.balance = $scope.accountDetails.balance - expense;
            Accounts.update($scope.accountDetails, $scope.oldAccountDetails);
        };

        $scope.checkField = function (fieldToCheck) {
            if (fieldToCheck === undefined || fieldToCheck === "" || fieldToCheck === null) {                
                return false;
            }
        };

        $scope.cleanInputFields = function () {
            $scope.expenseFormData.purchaseItem = "";
            $scope.expenseFormData.amountSpent = "";
        };

        $scope.submitExpense = function () {
            if ($scope.checkField($scope.expenseFormData.purchaseItem) === false || $scope.checkField($scope.expenseFormData.amountSpent) === false) {
                $scope.showRequiredToast();
                return false
            }
            Expenses.add($scope.expenseFormData);
            $scope.updateBalance($scope.expenseFormData.amountSpent);
            $scope.Modal.hide()
            $scope.cleanInputFields()
            $scope.showSubmitToast("success");
            $scope.populateAllExpenses();
        };

        $scope.populateAccount();
        $scope.populateAllExpenses();
    };
})();