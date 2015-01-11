/**
 * Created by hmchung on 7/1/14.
 */
'use strict';
(function(){
  angular.module('mcDirective', [])
    .directive('mcBackToTop', function () {
      return{
        restrict: 'EA',
        templateUrl: 'mc_components/views/back-to-top.html',
        link: function (scope, element, attr) {
          /** BEGIN BACK TO TOP **/
          element.find("#back-top").hide();

          $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
              element.find('#back-top').fadeIn();
            } else {
              element.find('#back-top').fadeOut();
            }
          });
          element.find('#back-top a').click(function () {
            angular.element('body,html').animate({
              scrollTop: 0
            }, 800);
            return false;
          });

          /** END BACK TO TOP **/
        }
      }
    })
    .directive('mcAlert', function () {
      return{
        restrict: 'E',
        scope: {
          data: '=stData'
        },
        controller: function ($scope) {

          $scope.delete = function (index) {
            $scope.data.splice(index, 1);
          }
        },
        templateUrl: 'mc_components/views/alert.html',
        link: function (scope, element, attr) {

          scope.max = attr.stMax != null ? attr.stMax : scope.data.length;

        }
      };
    })
    .directive('mcSocical', function () {
      return{
        restrict: 'EA',
        scope: {
          data: '=stData'
        },
        templateUrl: 'mc_components/views/socical.html'
      };
    })
    .directive('mcSocicalItem', function () {
      return{
        restrict: 'E',
        scope: {
          data: '=stData',
          style: '@stStyle'
        },
        templateUrl: 'mc_components/views/socical-item.html'
      };
    })
    .directive('mcNotification', function () {
      return{
        restrict: 'EA',
        scope: {
          title: '@stTitle',
          data: '=stData',
          icon: '@stIcon',
          badge: '@stBadge'
        },
        templateUrl: 'mc_components/views/notification.html'
      };
    })
    .directive('mcNotificationContent', function () {
      return{
        restrict: 'A',
        templateUrl: 'mc_components/views/notification-content.html',
        scope: {
          data: '=stData',
          title: '@stTitle'
        },
          controller: function($scope){
              var status = $scope.title;
              $scope.userStatus = angular.equals(status, 'Friend requests') ? true : false;
          }
      };
    })
    .directive('mcMorrisChart', function () {
      return{
        restrict: 'AE',
        scope: {
          data: '=mcData',
          id: '@mcId',
          type: '@mcType'
        },
        link: function (scope, element, attrs) {

          element.replaceWith('<div id="' + scope.id + '" style="height:100%"></div>');
          if (scope.type == 'line') {
            Morris.Line({
              element: scope.id,
              data: scope.data.data,
              xkey: scope.data.xkey,
              ykeys: [scope.data.ykeys],
              labels: [scope.data.labels],
              resize: scope.data.resize,
              lineColors: [scope.data.lineColors],
              pointFillColors: [scope.data.pointFillColors],
              pointStrokeColors: [scope.data.pointStrokeColors],
              gridTextColor: [scope.data.gridTextColor],
              pointSize: scope.data.pointSize,
              grid: false
            });
          }
          else if (scope.type == 'bar') {
            Morris.Bar({
              element: 'morris-widget-2',
              data: scope.data.data,
              xkey: scope.data.xkey,
              ykeys: [scope.data.ykeys],
              labels: [scope.data.labels],
              resize: scope.data.resize,
              barColors: [scope.data.barColors],
              gridTextColor: [scope.data.gridTextColor],
              gridTextSize: scope.data.gridTextSize,
              grid: scope.data.grid,
              axes: scope.data.axes
            });
          }
        }
      };
    })
    .directive('mcCarousel', ['$timeout', function ($timeout) {
      return{
        restrict: 'AE',
        scope: {
          list: '=mcData'
        },
        templateUrl: 'mc_components/views/carousel.html',
        link: function (scope, element, attrs) {

          $timeout(function () {
            element.children().owlCarousel({
              navigation: false, // Show next and pre buttons
              sideSpeed: 300,
              items: attrs.mcItems,
              paginationSpeed: 400,
              pagination: false,
              responsive: true
            });
          });
          element.children().css({
            'width': '100%',
            'height': 'auto'
          });

        }
      };
    }])
      .directive('mcTaskList', function () {
          return{
              restrict:'E',
              scope:{
                  list:'=stList',
                  title:'@stTitle'
              },
              templateUrl:'mc_components/views/task-list.html'
          };
      })
    .directive('mcRating', function(){
      return{
        restrict: 'EA',
        scope: {
          max: '@stMax',
          star: '@stStar'
        },
        link: function(scope, element, attr){

          for(var i=0 ; i<scope.max; i++){
            if(i < scope.star){
              element.append('<i class="fa fa-star text-warning"></i>');
            }else{
              element.append('<i class="fa fa-star"></i>');
            }
          }
        }
      };
    })
      .directive('mcProgress', function () {
          return{
              restrict:'E',
              scope:{
                  data:'=stData'
              },
              templateUrl:'mc_components/views/progress.html',
              link: function (scope, element, attrs) {
                  var sstatus = element.find('#sstatus'),
                      percent = scope.data.percent;
                  sstatus.css('width', percent + '%');
                  if (percent >= 80) {
                      sstatus.css('background-color', '#E9573F');
                  }
                  else if (percent < 80 && percent >= 70) {
                      sstatus.css('background-color', '#3BAFDA');
                  }
                  else if (percent < 70 && percent >= 60) {
                      sstatus.css('background-color', '#F6BB42');
                  }
                  else if (percent < 60 && percent >= 50) {
                      sstatus.css('background-color', '#F6BB42');
                  }
                  else {
                      sstatus.css('background-color', '#8CC152');
                  }
              }
          };
      })
      .directive('mcWeatherSmallIcon', function () {
          return{
              restrict:'E',
              templateUrl:'mc_components/views/weather-small-icon.html',
              link:function (scope, element, attr) {
                  var skycon = element.find('.skycon'),
                      index = attr.stIndex,
                      list = [
                          'clear-night',
                          'snow',
                          'fog'
                      ];
                  scope.skycon = list[index];
              }
          }
      })
    .directive('mcCeilNumber', function(){
      return{
        restrict: 'EA',
        template: '<span class="st-plus"></span>{{num | number:2}}',
        scope: {},
        link: function(scope, element, attr){
          var num = Math.ceil(attr.stData);
          scope.num = num;
          if(attr.stData < num){
            element.find('.st-plus').replaceWith('+');
          }
        }
      }
    })
    .directive('simplifiedNumber', function(){
      return{
        restrict: 'EA',
        scope: {
          data: '@stData'
        },
        template: '<h1 class="bolded">{{point | number}}<span ng-show="nbig">K</span></h1>',

        controller: function($scope){

          var number = '';
            $scope.nbig = false;
          if ($scope.data.length > 6) {
              $scope.nbig = true;
            number = $scope.data.slice(0, $scope.data.length - 3);
              $scope.point = number;
          }
          else{
              $scope.point = $scope.data;
          }
        }
      };
    })
})();