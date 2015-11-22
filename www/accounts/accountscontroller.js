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

      $scope.showaddnewaccount = function () {
        $scope.addAccount = true;
        $scope.hideaddnewaccountbtn = true;
      }

      $scope.submitnewaccount = function () {        
       if($scope.accountFormData.accountname !== undefined && $scope.accountFormData.balance !== undefined){
        $scope.newAccount = {'accountname': $scope.accountFormData.accountname, 
                             'balance': $scope.accountFormData.balance};
        Accounts.add($scope.newAccount);
        $scope.populateAllAccounts();
        $scope.addAccount = false;
        $scope.hideaddnewaccountbtn = false;
        $scope.accountFormData.accountname = '';
        $scope.accountFormData.balance = ''; 
       }                  
      }      
      $scope.populateAllAccounts();
      
    })
})();