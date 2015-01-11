/**
 * Created by hmchung on 7/1/14.
 */
'use strict';
(function(){
  angular.module('mcController', [])
    .controller('NiceScroll', function ($scope, $element) {
      $element.find(".sidebar-nicescroller").niceScroll({
        cursorcolor: "#121212",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "0px"
      });
      $element.find(".sidebar-nicescroller").getNiceScroll().resize();
    })
})();