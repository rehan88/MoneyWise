(function () {

  angular.module('app.accounts', [])
    .controller('accountscontroller', function ($scope,$location, $ionicModal,ionicMaterialInk, ionicMaterialMotion, $timeout, $cordovaSQLite, Accounts, ionicToast) {

      ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple()

      $scope.accounts = [];
      $scope.accountFormData = {};

      $scope.onSwipeLeft = function(account) {
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
      }

      $scope.showToast = function (accountType) {
        ionicToast.show(accountType + ' account has been added.', 'bottom', false, 2500);
      };

      $scope.showRequiredToast = function (field) {
        ionicToast.show('Please enter' + field, 'bottom', false, 2500);
      };
        
      $scope.hideNewAccount = function () {
          $scope.addAccount = false;
          $scope.hideAddNewAccountBtn = false;
      };
      
      $scope.onHold= function() {
        $scope.showDeleteButton = true;
      };
                      
      $scope.deleteAccount= function(account) {
        Accounts.remove(account);
        $scope.populateAllAccounts();
        $scope.showDeleteButton = false;
        $scope.showRequiredToast("Account has been deleted");
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
        $scope.newAccount = { 'accountname': $scope.accountFormData.accountName, 'balance': $scope.accountFormData.balance };
        Accounts.add($scope.newAccount);
        $scope.populateAllAccounts();
        $scope.showToast($scope.accountFormData.accountName);
        $scope.addAccount = false;
        $scope.hideAddNewAccountBtn = false;
        $scope.accountFormData.accountName = '';
        $scope.accountFormData.balance = '';
      }
      $scope.populateAllAccounts();
    })
})();