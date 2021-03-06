function updateBadgeImgSrc() {
  $('li.codeschool-badge img').each(function() {
     var img = $(this);
     var alt = $(this).attr("alt");

      switch(alt) {
        case "Ruby Path Badge":
          img.attr("src", "images/codeschool-ruby.jpg");
          break;
        case "JavaScript Path Badge":
          img.attr("src", "images/codeschool-javascript.jpg");
          break;
        case "HTML/CSS Path Badge":
          img.attr("src", "images/codeschool-html-css.jpg");
          break;
        case "iOS Path Badge":
          img.attr("src", "images/codeschool-ios.svg");
          break;
        case "Electives Path Badge":
          img.attr("src", "images/codeschool-electives.jpg");
          break;
      }
  });
}

function animateBadgeShading() {
  $('li.codeschool-badge').each(function() {

    var height   = $(this).height();
    var width    = $(this).width();
    var complete = $(this).data("complete");
    var total    = $(this).data("total");

    var center = {
      x: width  / 2,
      y: height / 2
    };

    var options = {
      height: height + 14,
      width:  width + 14
    };

    var canvas = new Two(options).appendTo(this);

    var radialLines   = [];
    var polygons      = [];

    function angle(index) {
      var sliceAngle = 360 / total;
      var angleDegrees = -90 + ((index * sliceAngle) % 360);
      return angleDegrees * (Math.PI / 180);
    };

    for (slice = 0; slice < total; slice++) {
      x1 = center.x + Math.cos(angle(slice    )) * (width  / 2);
      y1 = center.y + Math.sin(angle(slice    )) * (height / 2);
      x2 = center.x + Math.cos(angle(slice + 1)) * (width  / 2);
      y2 = center.y + Math.sin(angle(slice + 1)) * (height / 2);

      var points = [
        new Two.Vector(center.x, center.y),
        new Two.Vector(      x1,       y1),
        new Two.Vector(      x2,       y2)
      ];

      radialLines.push(canvas.makeLine(center.x, center.y, x1, y1));
      polygons.push(new Two.Polygon(points, closed));
    }

    var polygonGroup     = canvas.makeGroup(polygons);
    polygonGroup.stroke  = "none";
    polygonGroup.fill    = "#181b21";
    polygonGroup.opacity = 0;

    var lineGroup        = canvas.makeGroup(radialLines);
    lineGroup.linewidth  = "2px";
    lineGroup.stroke     = "#efeddf";
    lineGroup.opacity    = 0;

    var fillComplete     = false;
    var defillComplete   = false;
    var shadeStep        = 0.03;
    var n                = 0;

    canvas.bind("update", function(frameCount) {
      if (!fillComplete) {
        polygonGroup.opacity += shadeStep;
        lineGroup.opacity    += shadeStep;

        if (polygonGroup.opacity > 0.8) fillComplete = true;
      }

      if (fillComplete && !defillComplete) {
        if (n < complete) {
          polygons[n].opacity                          -= (shadeStep);
          if (n > 0) radialLines[n].opacity            -= (shadeStep);
          if (n == (total - 1)) radialLines[0].opacity -= (shadeStep);

          if (polygons[n].opacity < 0.03) n++;
        } else {
          defillComplete = true
        }
      }

      if (fillComplete && defillComplete) return canvas.unbind("update")
    }).play();
  });
}
