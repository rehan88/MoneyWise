(function () {
  'use strict'

  angular.module('app.accounts').controller('accountscontroller', accountscontroller);
  accountscontroller.$inject = ["$scope", "$ionicModal", "$location", "ionicMaterialInk", "ionicMaterialMotion", "$cordovaSQLite", "Accounts", "ionicToast"];

  function accountscontroller($scope, $ionicModal, $location, ionicMaterialInk, ionicMaterialMotion, $cordovaSQLite, Accounts, ionicToast) {

    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple()

    $scope.$on('$ionicView.enter', function () {
      $scope.populateAllAccounts();
    });

    $scope.accounts = [];
    $scope.accountFormData = {};
    // 
    //     $scope.firstLetter = function(accountName) {
    //       alert(accountName.charAt(0));
    //       return accountName.charAt(0);
    //     };
    
    $ionicModal.fromTemplateUrl('/accounts/delete-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show()
    }

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });


    $scope.onSwipeLeft = function (account) {
      $location.url("app/expenses/" + account.id);
    };

    $scope.populateAllAccounts = function () {
      Accounts.all().then(function (accounts) {
        $scope.accounts = accounts;
      });
    };

    $scope.showAddNewAccount = function () {
      $scope.addAccount = true;
      $scope.hideAddNewAccountBtn = true;
      $scope.focusInputAccountName = true;
    };

    $scope.showSubmitToast = function (accountName, toastType) {
      if (toastType === "success") {
        ionicToast.show(accountName + ' account has been added.', 'bottom', false, 2500);
      }
      if (toastType === "remove") {
        ionicToast.show(accountName + ' has been removed.', 'bottom', false, 2500);
      }
    };

    $scope.showRequiredToast = function (field) {
      ionicToast.show('Please enter' + field, 'bottom', false, 2500);
    };

    $scope.hideNewAccount = function () {
      $scope.focusInputAccountName = false;
      $scope.addAccount = false;
      $scope.hideAddNewAccountBtn = false;
    };

    $scope.onSwipeDown = function () {
      $scope.showDeleteButton = true;
    };

    $scope.deleteAccount = function (account) {
      Accounts.remove(account);
      $scope.populateAllAccounts();
      $scope.showDeleteButton = false;
      $scope.showSubmitToast(account.accountname, "remove");
    };

    $scope.submitNewAccount = function () {
      if ($scope.accountFormData.accountName === undefined || $scope.accountFormData.accountName === "") {
        $scope.showRequiredToast(" an account name");
        return false;
      }
      if ($scope.accountFormData.balance === undefined || $scope.accountFormData.balance === "") {
        $scope.showRequiredToast(" a balance");
        return false;
      }
      $scope.newAccount = {
        'accountname': $scope.accountFormData.accountName,
        'balance': $scope.accountFormData.balance
      };
      Accounts.add($scope.newAccount);
      $scope.populateAllAccounts();
      $scope.addAccount = false;
      $scope.hideAddNewAccountBtn = false;
      $scope.showSubmitToast($scope.accountFormData.accountName, "success");
      $scope.accountFormData.accountName = '';
      $scope.accountFormData.balance = '';
    };

  }
})();