function bootstrapCarouselNormalization() {
  var items   = $('#carousel-github-projects .item'), // grab all slides
      heights = [],                                   // array to store heights
      tallest;                                        // tallest slide

  if (items.length) {
    function normalizeHeights() {
      items.each(function() {
        heights.push($(this).height());               // add heights to array
      });

      tallest = Math.max.apply(null, heights);        // find the largest height

      items.each(function() {
        $(this).css('min-height', tallest + 'px');
      });
    };

    normalizeHeights();

    $(window).on('resize orientationchange', function() {
      tallest = 0, heights.length = 0;               // reset the variables

      items.each(function() {
        $(this).css('min-height', '0');              // reset each item's height
      });

      normalizeHeights();                            // run it again
    });
  }
}