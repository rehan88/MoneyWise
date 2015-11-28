(function(){

angular.module('app.expenses', [])
       .controller('expensescontroler', function($scope, $stateParams, $location, $ionicModal, $timeout, Accounts) {        
      
      $scope.accountId = $stateParams.accountid;
      $scope.accountName = "";
      
       $scope.populateAccount = function () {
        Accounts.get($scope.accountId).then(function (account) {
        $scope.accountName = account.accountname;        
        });
      };
      
      $scope.populateAccount();
      
      $scope.onSwipeRight = function(account) {
        $location.url("app/accounts");        
      };        
})  
})();