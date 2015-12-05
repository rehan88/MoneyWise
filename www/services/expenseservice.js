(function(){
  'use strict'
  
  angular.module('app.expensesservice', []).factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;
  
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }  
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Expenses', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, item, amountspent, datespent, id_account FROM expenses")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(accountid) {
    var parameters = [accountid];
    return DBA.query("SELECT id, item, amountspent, datespent, id_account FROM expenses WHERE id_account = (?)", parameters)
      .then(function(result) {     
        return DBA.getAll(result);
      });
  }

  self.add = function(expense) {    
    var parameters = [expense.item, expense.amountspent, expense.datespent, expense.accountid];
    return DBA.query("INSERT INTO expenses (item, amountspent, datespent, id_account) VALUES (?,?,?,?)", parameters);
  }

  self.remove = function(expense) {    
    var parameters = [expense.id];    
    return DBA.query("DELETE FROM expenses WHERE id = (?)", parameters);
  }

  self.update = function(origExpense, editExpense) {
    var parameters = [editExpense.id, editExpense.name, origExpense.id];    
    return DBA.query("UPDATE expenses SET id = (?), item = (?), amountspent = (?), datespent = (?), account_d = (?)WHERE id = (?)", parameters);
  }
  return self;
})
  
})();