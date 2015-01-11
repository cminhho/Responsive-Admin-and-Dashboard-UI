'use strict';
(function () {
    angular.module('mainDirective', ['easypiechart'])
        .directive('topNavbar', function () {
            return{
                restrict:'E',
                controller:'CollapseDemoCtrl',
                templateUrl:'views/top-navbar.html'
            };
        })
        .directive('topNavbarLogo', function () {
            return{
                restrict:'E',
                templateUrl:'views/top-navbar-logo.html',
                link:function (scope, element, atts) {
                    var logo = atts.stLogo;
                    scope.logo = 'images/' + logo;
                }
            };
        })
        .directive('topNavbarNotify', function () {
            return{
                restrict:'E',
                templateUrl:'views/top-navbar-notify.html'
            };
        })
        .directive('topNavbarUser', function () {
            return{
                restrict:'E',
                templateUrl:'views/top-navbar-user.html',
                controller: function($scope){
                    $scope.avatar = 'images/avatar/' + $scope.userImage;
                },
                scope:{
                    userName:'@stUsername',
                    userImage:'@stUserimage'
                }
            };
        })
        .directive('colorSchemes', function () {
            return{
                restrict:'E',
                scope:{
                    data:'=stData'
                },
                templateUrl:'views/color-schemes.html',
                link:function (scope, element, attr) {
                    var show = true,
                        boxColor = element.find('.box-demo');
                    var toggle = {
                        right:'-200px'
                    };
                    element.find('#demo-panel').on('mousedown', function () {
                        if (show) {
                            boxColor.css(toggle);
                            show = !show;
                        } else {
                            boxColor.css({
                                right:'0'
                            });
                            show = !show;
                        }
                    })
                }
            };
        })
        .directive('colorSchemesContent', function () {
            return{
                restrict:'E',
                templateUrl:'views/color-schemes-content.html',
                link:function (scope, element, attr) {
                    var changecolor = element.find('#color');
                    var style = angular.element('.style-color-schemes');
                    changecolor.on('mousedown', function () {
                        if (style.children().length > 0) {
                            style.children(0).replaceWith('<link rel="stylesheet" href="styles/color-schemes/color-schemes-' + scope.item.link + '.css"/>');
                        }
                        else {
                            style.append('<link rel="stylesheet" href="styles/color-schemes/color-schemes-' + scope.item.link + '.css"/>');
                        }
                    });

//              var demo = element.find('#color');
//            var sidebar = angular.element('.sidebar-menu');
//            var subsidebar = angular.element('.sidebar-menu li a');
//            var logo = angular.element('.logo-brand');
//            var navContent = angular.element('.top-nav-content');
//            var fa = angular.element('.top-navbar');
//            var nav = angular.element('.dropdown-toggle');
//            var bullhorn = angular.element('.btn-collapse-sidebar-right');
//
//            var sidebartext = angular.element('.sidebar-left-content');
//          demo.on('mousedown', function(){
//
//              var head = angular.element('head');
//              $('head').append('<link rel="stylesheet" href="styles/color-schemes-default.css"/>');
//
//            logo.css('background', scope.data.logo);
//            sidebar.css('background', scope.data.sidebar);
//            subsidebar.css('border-bottom-color', scope.data.subsidebar);
//            navContent.css('background', scope.data.navcontent);
//
//            sidebartext.css('color','#AAB2BD');
//
//            if(scope.data.topcolor == 'bg-white' && scope.data.top == 'half-tiles'){
//              sidebartext.css('color',scope.data.colorsidebar);
//            }
//
//            if(scope.data.navcontent != '#ffffff' && scope.data.top == 'half-tiles'){
//              fa.css('color', 'white');
//              nav.css('color', 'white');
//              bullhorn.css('color', 'white');
//            }
//            else{
//              fa.css('color', '#656D78');
//              nav.css('color', '#656D78');
//              bullhorn.css('color', '#656D78');
//            }
//
//          });

                }
            };
        })

        .directive('pageContent', function () {
            return{
                restrict:'E',
                templateUrl:'views/page-content.html'
            };
        })
        .directive('topSidebarRightHeading', function () {
            return{
                restrict:'AE',
                templateUrl:'views/top-sidebar-right-heading.html'
            };
        })
        .directive('mainPageHeading', function () {
            return{
                restrict:'E',
                scope:{
                    title:'@stTitle',
                    content:'@stContent'
                },
                templateUrl:'views/main-page-heading.html'
            };
        })
        .directive('mainSiteInfomation', function () {
            return{
                restrict:'E',
                scope:{
                    infomations:'=stData',
                    infomationsLast:'=stDataLast'
                },
                controller:function ($scope) {
//                    this.todayData = function () {
//                        return $scope.infomations;
//                    };
                    this.todayLast = function () {
                        return $scope.infomationsLast;
                    };
                },
                templateUrl:'views/main-site-infomation.html'
            };
        })
        .directive('subInfomation', function ($window) {
            return{
                restrict:'A',
                require:'^mainSiteInfomation',
                scope:{
                    item:'=stData',
                    image:'@stImage'
                },
                templateUrl:'views/sub-infomation.html',
                link:function (scope, element, attrs, ctrl) {
                    var betterStr = 'Better than yesterday',
                        lessStr = 'Less than yesterday',
                        siteInfomationLast = ctrl.todayLast(),
                        today = scope.item.number,
                        bgProgress = element.find('.progress-bar'),
                        yesterday = siteInfomationLast[attrs.stIndex].number,
                        percent = $window.Math.round(((today - yesterday) / yesterday) * 100);

                    scope.number = today;

                    if (today > yesterday && percent > 0) {
                        scope.context = 'Better than yesterday ( ' + percent + '% )';
                        if (percent < 6 && percent > 0) {
                            element.addClass('bg-warning');
                            bgProgress.addClass('progress-bar-warning');
                        }
                        else if (percent < 11 && percent > 5) {
                            element.addClass('bg-success');
                            bgProgress.addClass('progress-bar-success');
                        }
                        else {
                            element.addClass('bg-primary');
                            bgProgress.addClass('progress-bar-primary');
                        }
                    }
                    else if (today >= yesterday) {
                        scope.context = betterStr + ' ( ' + percent + '% )';
                    } else {
                        scope.context = lessStr + ' ( ' + percent + '% )';
                        element.addClass('bg-danger');
                        bgProgress.addClass('progress-bar-danger');
                    }
                }
            };
        })
        .directive('sidebarLeft', function () {
            return{
                restrict:'E',
                scope:{
                    menus:'=stMenus',
                    settings:'=stSettings'
                },
                controller:'NiceScroll',
                templateUrl:'views/sidebar-left.html',
                link: function (scope, element, attr) {
                    /** SIDEBAR FUNCTION **/
                    scope.chung = function (index) {
                        scope.sub = scope.sub == index ? -2 : index;
                    };
                    /** END SIDEBAR FUNCTION **/
                }
            };
        })

        .directive('sidebarLeftSettings', function () {
            return{
                restrict:'AE',
                scope:{
                    data:'=stData'
                },
                templateUrl:'views/sidebar-left-settings.html'
            };
        })
        .directive('sidebarRight', function () {
            return{
                restrict:'E',
                templateUrl:'views/sidebar-right.html',
                controller:'NiceScroll'
            };
        })
        .directive('sidebarRightItem', function () {
            return{
                restrict:'EA',
                scope:{
                    title:'@stTitle',
                    data:'=stData'
                },
                templateUrl:'views/sidebar-right-item.html',
                link:function (scope, element, attr) {
                    scope.stFilter = attr.stFilter;
                    scope.userStatus = false;
                    scope.taskStatus = false;
                    scope.notificationStatus = false;
                    scope.settingStatus = false;
                    var status = attr.stStatus;
                    if (angular.equals(status, 'user')) {
                        scope.userStatus = true;
                    }
                    else if (angular.equals(status, 'notification')) {
                        scope.notificationStatus = true;
                    }
                    else if (angular.equals(status, 'task')) {
                        scope.taskStatus = true;
                    }
                    else if (angular.equals(status, 'setting')) {
                        scope.settingStatus = true;
                    }
                }
            };
        })
        .directive('pageFooter', function () {
            return{
                restrict:'E',
                scope:{
                    author:'@stAuthor',
                    design:'@stDesign'
                },
                templateUrl:'views/page-footer.html'
            };
        })

        .directive('mainWidget', function () {
            return{
                restrict:'E',
                templateUrl:'views/main-widget.html'
            };
        })
        .directive('mainChartWidget', function () {
            return{
                restrict:'E',
                scope:{
                    data:'=stData'
                },
                templateUrl:'views/main-chart-widget.html'
            };
        })
        .directive('propertyCard', function () {
            return{
                restrict:'E',
                scope:{
                    list:'=stList',
                    title:'@stTitle'
                },
                templateUrl:'views/property-card.html'
            };
        })


        .directive('weatherWidget', function () {
            return{
                restrict:'E',
                scope:{
                    today:'=stToday',
                    tomorow:'=stTomorow'
                },
                templateUrl:'views/weather-widget.html'
            };
        })

        .directive('friendRequests', function () {
            return{
                restrict:'E',
                scope:{
                    title:'@stTitle',
                    list:'=stList'
                },
                templateUrl:'views/friend-requests.html'
            };
        })
        .directive('friendRequestsItem', function () {
            return{
                restrict:'E',
                scope:{
                    data:'=stData'
                },
                controller:function () {
                    if (typeof Skycons !== 'undefined') {
                        var icons = new Skycons(
                                {"color":"#fff"},
                                {"resizeClear":true}
                            ),
                            list = [
                                "clear-day", "rain",
                                "partly-cloudy-night", "clear-night", "sleet", "snow", "wind",
                                "fog"
                            ],
                            i;

                        for (i = list.length; i--;)
                            icons.set(list[i], list[i]);
                        icons.play();
                    }
                },
                templateUrl:'views/friend-requests-item.html',
                link:function (scope, element, attrs) {
                    //Css for first row
                    var friendRequest = element.find('#st-friend-requests');

                    if (attrs.stIndex == 0) {
                        friendRequest.addClass('bg-success');
                    }
                    // Avatar
                    scope.data.avatar = 'images/avatar/' + scope.data.avatar;
                }
            };
        })
        .directive('mainServerStatus', function () {
            return{
                restrict:'E',
                templateUrl:'views/main-server-status.html'
            };
        })
        .directive('serverStatusWidget', function () {
            return{
                restrict:'E',
                scope:{
                    title:'@stTitle',
                    systemStatus:'=stSystemstatus',
                    chart:'=stChart'
                },
                templateUrl:'views/server-status-widget.html'
            };
        })
        .directive('chartWidget', function () {
            return{
                restrict:'E',
                templateUrl:'views/chart-widget.html',
                controller:function ($scope) {
                    $scope.anotherPercent = $scope.data.percent;
                    $scope.anotherOptions = {
                        easing:'easeOutBounce',
                        barColor:'#3BAFDA',
                        lineWidth:10
                    };
                    if ($scope.data.percent > 50) {
                        $scope.anotherOptions = {
                            easing:'easeOutBounce',
                            barColor:'#F6BA48',
                            lineWidth:10
                        };
                    }
                },
                scope:{
                    data:'=stData'
                }
            };
        })
        .directive('widgetSystemStatus', function () {
            return{
                restrict:'E',
                templateUrl:'views/widget-system-status.html'
            };
        })

        .directive('headlineNewTitle', function () {
            return{
                restrict:'E',
                scope:{
                },
                controller:function ($scope, $element) {
                    //       Owl Carousel
                    $element.find('#tiles-slide-2').owlCarousel({
                        navigation:false, // Show next and pre buttons
                        sideSpeed:500,
                        paginationSpeed:800,
                        singleItem:true,
                        pagination:false,
                        responsive:true,
                        autoPlay:true
                    });
                    $element.find('#tiles-slide-3').owlCarousel({
                        navigation:false, // Show next and pre buttons
                        sideSpeed:500,
                        paginationSpeed:800,
                        singleItem:true,
                        pagination:false,
                        responsive:true,
                        autoPlay:true
                    });
                },
                templateUrl:'views/headline-new-title.html'
            };
        })
        .directive('mainWeatherWidget', function () {
            return{
                restrict:'E',
                scope:{
                    'list':'=stList',
                    'title':'@stTitle'
                },
                templateUrl:'views/main-weather-widget.html'
            };
        })
        .directive('mainWeatherWidgetContent', function () {
            return{
                restrict:'E',
                controller:'',
                templateUrl:'views/main-weather-widget-content.html',
                link:function (scope, element, attrs) {
                    var status = scope.item.status,
                        bgElement = element.find('#box-weather4');

                    if (angular.equals(status, 'It\'s sunny')) {
                        bgElement.addClass('bg-warning');
                        scope.skycon = 'clear-day';
                    }
                    else if (angular.equals(status, 'It\'s raining')) {
                        bgElement.addClass('bg-danger');
                        scope.skycon = 'rain';
                    }
                    else if (angular.equals(status, 'It\'s wind')) {
                        bgElement.addClass('bg-success');
                        scope.skycon = 'wind';
                    } else {
                        bgElement.addClass('bg-primary');
                        scope.skycon = 'partly-cloudy-night';
                    }
                }
            };
        })
        .directive('mainItemShowcase', function () {
            return{
                restrict:'E',
                templateUrl:'views/main-item-showcase.html'
            };
        })
        .directive('lastWeekPopularItem', ['$timeout', function ($timeout) {
        return{
            restrict:'AE',
            scope:{
                data:'=stData'
            },
            templateUrl:'views/last-week-popular-item.html',
            link:function (scope, element, attr) {
                $timeout(function () {
                    element.find('#owl-popular').owlCarousel({
                        navigation:false, // Show next and pre buttons
                        sideSpeed:300,
                        paginationSpeed:500,
                        singleItem:false,
                        pagination:false,
                        responsive:true,
                        item:4,
                        autoPlay:true
                    });
                });
            }
        };
    }])
        .directive('featuredProduct', function () {
            return{
                require:'propertyCard',
                restrict:'E',
                scope:{
                    title:'@stTitle ',
                    data:'=stData'
                },
                templateUrl:'views/featured-product.html'
            };
        })
        .directive('reminderWidget', function () {
            return{
                restrict:'E',
                scope:{
                    title:'@stTitle',
                    data:'=stData'
                },
                controller:function ($scope, $element) {
                    //       Owl Carousel
                    $element.find('#owl-reminder').owlCarousel({
                        navigation:true, // Show next and pre buttons
                        sideSpeed:500,
                        paginationSpeed:800,
                        singleItem:true,
                        pagination:false,
                        responsive:true,
                        navigationText:['←', '→']
                    });
                },
                templateUrl:'views/reminder-widget.html'
            };
        })

    ;
})();