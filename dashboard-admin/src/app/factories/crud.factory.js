var crudService = function ($http, $q) {

  var crud = {}

  crud.post = function(table, formData){
    return $http
      .post(TSConfig.urlBase + table, formData)
      .then(function(response){
        return response;
      },function(response){
          return $q.reject(response.data);
    });
  }

  crud.get = function(table){
    return $http
      .get(TSConfig.urlBase + table)
  }

  crud.getById = function(table, searchId) {
    return $http
      .get(TSConfig.urlBase + table + "/" + searchId)
  }

  crud.getWithFilter = function(table, formData) {
    return $http
      .post(TSConfig.urlBase + table + "/filter", formData)
      .then(function(response){
        return response;
      },function(response){
          return $q.reject(response.data);
    });
  }

  crud.delete = function(table, id){
    return $http
      .delete(TSConfig.urlBase + table + "/" + id)
      .then(function(response){
        return;
      },function(response){
            return $q.reject(response.data);
      });
  }

  crud.update = function(table, id, formData, id2){
    if(id2 === undefined) {
      id2 = ''
    }

    return $http
      .put(TSConfig.urlBase + table + "/" + id, formData)
      .then(function(response){
        return;
      },function(response){
          return $q.reject(response.data);
    });
  }

  return crud;

};

angular
  .module('app')
  .factory('crudService', crudService);
