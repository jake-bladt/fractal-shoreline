var fractal = (function($) {
  var _cc = undefined;

  return {
    canvasContext: function(cc) {
    if(cc) _cc = cc;
    return _cc;
    },

    drawLine: function(x1, y1, x2, y2) {
      _cc.lineWidth = 2;
      _cc.strokeStyle = 'black';
      _cc.moveTo(x1, y1);
      _cc.lineTo(x2, y2);
      _cc.stroke();
    },

    drawMultiline: function(points) {
      for(i = 1; i < points.length; i++) {
        var start = points[i -1];
        var end = points[i];
        this.drawLine(start.x, start.y, end.x, end.y)
      }
    },

    generateShoreline: function(shape, args) {
      var shoreline = {
        points: [];
      };

      for(var i = 0; i < shape.points.length - 1; ++i) {
        // when snowflakes live long enough, they evolve into glaciers
        var start = shape.points[i];
        var end = shape.points[i + 1];
        shoreline.points.push(start);
        // push a point 1/3ish from start to end.
        // push a point up to 20% the line's length above
        // or below the line, perpendicular
        // push a point 2/3ish from start to end.
      }; 
      return newShoreline;
    }
  };

})(jQuery);

$(document).ready(function() {
  fractal.canvasContext(jQuery('#mapCanvas')[0].getContext('2d'));
});
