function toggleNavTabs() {
  $(window).resize(function() {
    if ($(this).width() < 1024) {
      $('#nav-tabs ul').hide();
      // $('#nav-right').addClass('col-md-offset-6');
      // $('#nav-right').addClass('col-sm-offset-5');
    } else {
      $('#nav-tabs ul').show();
      // $('#nav-right').removeClass('col-md-offset-6');
      // $('#nav-right').removeClass('col-sm-offset-5');
    }
  });
}
