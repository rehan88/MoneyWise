(function () {

  angular.module('app.accounts', [])
    .controller('accountscontroller', function ($scope, $ionicModal,ionicMaterialInk , ionicMaterialMotion, $timeout, $cordovaSQLite, Accounts) {

      ionicMaterialInk.displayEffect();  
      ionicMaterialMotion.ripple()

      $scope.accounts = [];
      $scope.accountFormData = {};

      $scope.populateAllAccounts = function () {
        Accounts.all().then(function (accounts) {
          $scope.accounts = accounts;
        });
      };

      $scope.showAddNewAccount = function () {
        $scope.addAccount = true;
        $scope.hideAddNewAccountBtn = true;
      }

      $scope.submitNewAccount = function () {        
       if($scope.accountFormData.accountName !== undefined && $scope.accountFormData.balance !== undefined){
        $scope.newAccount = {'accountName': $scope.accountFormData.accountName,'balance': $scope.accountFormData.balance};
        Accounts.add($scope.newAccount);
        $scope.populateAllAccounts();
        $scope.addAccount = false;
        $scope.hideAddNewAccountBtn = false;
        $scope.accountFormData.accountName = '';
        $scope.accountFormData.balance = ''; 
       }                  
      }      
      $scope.populateAllAccounts();      
    })
})();