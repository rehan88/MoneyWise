var db = null;
  
angular.module('BudgetApp', ['app.routeconfig',                           
                             'ngCordova', 
                             'app.menu',
                             'app.accounts',                                                                                          
                             'app.expenses', 
                             'app.directdebits', 
                             'app.income'                            ])
    
.run(function ($ionicPlatform, $cordovaSQLite) { $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        };
        
        if (window.StatusBar) { StatusBar.styleDefault(); };
                
        if(window.cordova) { db = $cordovaSQLite.openDB("MoneyWise.db");} 
        else{db = window.openDatabase("MoneyWise.db", "1.0", "Money Wise", -1);}
            
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS accounts (id integer primary key, accountname text, balance text)");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS expenses (id integer primary key, item text, amountspent text, datespent text, id_account integer, FOREIGN KEY(id_account) REFERENCES accounts(id))");
        $cordovaSQLite.execute(db, "PRAGMA foreign-keys=ON;", []);
      });
 })    