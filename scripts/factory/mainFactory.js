'use strict';
(function () {
  angular.module('sentirFactory', [])
    .factory('userService', function () {
      var fac = ['John', 'James', 'Jake'];
      return fac;
    });
})();