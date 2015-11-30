 (function () {
  
  angular.module('app.routeconfig', ['ionic',])    
         .config(function ($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: 'menu/menu.html',
              controller: 'menucontroller'
            })
            .state('app.accounts', {
              url: '/accounts',
              views: {
                'menuContent': {
                  templateUrl: 'accounts/accounts.html', 
                  controller: 'accountscontroller'
                }
              }
            })
            .state('app.expenses', {
              url: '/expenses/:accountid',
              views: {
                'menuContent': {
                  templateUrl: 'expenses/expenses.html',
                  controller : 'expensescontroler' 
                }
              }
            })
            .state('app.income', {
              url: '/income',
              views: {
                'menuContent': {
                  templateUrl: 'income/income.html',
                  controller: 'incomecontroller'
                }
              }
            })
            .state('app.directdebits', {
              url: '/directdebits',
              views: {
                'menuContent': {
                  templateUrl: 'directdebits/directdebits.html',
                  controller: 'directdebitscontroller'
                }
              }
            });;
          $urlRouterProvider.otherwise('/app/accounts');
        });
})();