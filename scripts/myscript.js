//$(document).ready(function() {
//  $('#simple-menu').sidr({
//    displace: true
//  });
//});

$(document).ready(function () {
  $('#left-menu').sidr({
    name: 'sidr-left',
    side: 'left', // By default,
    displace: 'true'
  });
  $('#right-menu').sidr({
    name: 'sidr-right',
    side: 'right',
    displace: 'true'
  });
});
