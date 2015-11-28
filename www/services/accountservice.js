angular.module('app.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
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

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Accounts', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, accountname, balance FROM accounts")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(accountId) {
    var parameters = [accountId];
    return DBA.query("SELECT id, accountname, balance FROM accounts WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(account) {    
    var parameters = [account.accountname, account.balance];
    return DBA.query("INSERT INTO accounts (accountname, balance) VALUES (?,?)", parameters);
  }

  self.remove = function(account) {
    var parameters = [account.id];
    return DBA.query("DELETE FROM accounts WHERE id = (?)", parameters);
  }

  self.update = function(origAccount, editAccount) {
    var parameters = [editAccount.id, editAccount.name, origAccount.id];
    return DBA.query("UPDATE accounts SET id = (?), accountname = (?), balance = (?) WHERE id = (?)", parameters);
  }
  return self;
})