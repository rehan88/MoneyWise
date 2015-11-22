// (function () {
  var db = null;
  
  angular.module('BudgetApp', ['ionic','ionic-material','ngCordova', 'app.services', 'starter.controllers', 'app.accounts', 'app.expenses', 'app.directdebits', 'app.income', 'ionic-toast'])
    
    .run(function ($ionicPlatform, $cordovaSQLite) {
      $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
        
         if(window.cordova) {
          // App syntax
          db = $cordovaSQLite.openDB("MoneyWise.db");
        } else {
          // Ionic serve syntax
          db = window.openDatabase("MoneyWise.db", "1.0", "Money Wise", -1);
        }
    
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS accounts (id integer primary key, accountname text, balance text)");
        
      });
    })
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
          url: '/expenses',
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
// })();