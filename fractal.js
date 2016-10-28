var fractal = (function($) {

  var _cc = undefined;

  var getNextHop = function(start, end, current, hopsCount, agression) {

  }

  var getNextPoint = function(start, end, current, args) {
    var hopsTaken = args.hopsTaken || 0;
    var maxHops = args.maxHops || 10;
    var minHops = args.minHops || 5;
    var aggression = args.aggression || 1.0;
    var currentPoint = current || start;
    var remainingHops = maxHops - hopsTaken;

    if(remainingHops === 1) {
      return end;
    } else {
      return getNextPoint(start, end, currentPoint, remainingHops, aggression);
    }

  }

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

    generateFractalLine: function(args) {
      var start = args.start;
      var end = args.end;

      var points = [start];
      var currentPoint = undefined;

      while(currentPoint !== end) {
        currentPoint = getNextPoint(start, end, currentPoint, args);
        points.push(currentPoint);
      }


      return points;
    }
  };

})(jQuery);

$(document).ready(function() {
  fractal.canvasContext(jQuery('#mapCanvas')[0].getContext('2d'));
  var fractalLine = fractal.generateFractalLine({
    start: {x: 100, y: 100},
    end: {x:300, y:300}
  });
  fractal.drawMultiline(fractalLine);
});
