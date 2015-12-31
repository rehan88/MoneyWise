(function () {
    'use strict'

    angular.module('app.accounts').controller('accountscontroller', accountscontroller);
    accountscontroller.$inject = ["$scope", "$ionicModal", "$location", "$cordovaSQLite", "Accounts", "Expenses", "ionicToast"];

    function accountscontroller($scope, $ionicModal, $location, $cordovaSQLite, Accounts, Expenses, ionicToast) {

        $scope.accounts = [];
        $scope.accountToDelete = {};
        $scope.isNotValid = false;

        $scope.$on('$ionicView.enter', function () {
            $scope.populateAllAccounts();
        });

        $scope.accountFormData = {
            "accountname": "",
            "balance": ""
        };

        $ionicModal.fromTemplateUrl('/accounts/addmodal/add-modal.html', {
            id: 1,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal1 = modal;
        });

        $ionicModal.fromTemplateUrl('/accounts/deletemodal/delete-modal.html', {
            id: 2,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal2 = modal;
        });

        $scope.openModal = function (index) {
            if (index == 1) $scope.oModal1.show();
            else $scope.oModal2.show();
        };

        $scope.closeModal = function (index) {
            if (index == 1) $scope.oModal1.hide();
            else $scope.oModal2.hide();
        };


        $scope.onSwipeLeft = function (account) {
            $location.url("app/expenses/" + account.id);
        };

        $scope.populateAllAccounts = function () {
            Accounts.all().then(function (accounts) {
                $scope.accounts = accounts;
                if (accounts.length === 0) {
                    $scope.noAccounts = true;
                }
            });
        };

        $scope.showSubmitToast = function (accountName, toastType) {
            if (toastType === "success") {
                ionicToast.show("The account " + accountName + ' account has been added.', 'bottom', false, 2500);
            }
            if (toastType === "remove") {
                ionicToast.show("The account " + accountName + ' has been removed.', 'bottom', false, 2500);
            }
        };

        $scope.showRequiredToast = function () {
            ionicToast.show('All fields are required', 'bottom', false, 3000);
        };

        $scope.hideNewAccount = function () {
            $scope.focusInputAccountName = false;
        };

        $scope.setAccountToDelete = function (account) {
            $scope.accountToDelete = account;
        };

        $scope.deleteAccount = function () {
            Accounts.remove($scope.accountToDelete);
            Expenses.removeForAccount($scope.accountToDelete);
            $scope.populateAllAccounts();
            $scope.showSubmitToast($scope.accountToDelete.accountname, "remove");
        };

        $scope.checkFields = function (arrayToCheck) {
            angular.forEach(arrayToCheck, function (value, key) {
                if (value === undefined || value === "" || value === null) {
                    $scope.showRequiredToast();
                    $scope.isNotValid = true;
                } else {
                    $scope.isNotValid = false;
                }
            });
        };

        $scope.cleanForm = function () {
            $scope.accountFormData.accountname = '';
            $scope.accountFormData.balance = '';
        };

        $scope.submitNewAccount = function () {
            $scope.checkFields($scope.accountFormData);
            if ($scope.isNotValid) {
                return false;
            };
            Accounts.add($scope.accountFormData);
            $scope.noAccounts = false;
            $scope.populateAllAccounts();
            $scope.oModal1.hide()
            $scope.showSubmitToast($scope.accountFormData.accountname, "success");
            $scope.cleanForm();
        };
    }
})();