'user strict';
(function(){
  angular.module('mainFilter',[])
    .filter('numberFormat', function () {
      return function (n) {
        var num = parseInt(n, 10);
        var numFormat = '';
        if (isNaN(num)) {
          return 'NAN';
        }
        numFormat = (num / Math.pow(10, 3)).toFixed(0)+'K';
        return numFormat;
      };
    })
})();