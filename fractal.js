var fractal = (function($) {
  var _cc = undefined;

  var pointOnLine = function(line, pctDistance, coeff) {
    var coeffNum = ((typeof(coeff) === 'function') ? coeff() : coeff) || 1.0;
    var deltaX = line.end.x - line.start.x;
    var deltaY = line.end.y - line.start.y;
    return {
      x: line.start.x + deltaX * pctDistance * coeffNum,
      y: line.start.y + deltaY * pctDistance * coeffNum
    }
  };

  var lineLength = function(line) {
    var deltaX = line.end.x - line.start.x;
    var deltaY = line.end.y - line.start.y;
    if(0 === deltaX) return Math.abs(deltaY);
    if(0 === deltaY) return Math.abs(deltaX);
    return Math.sqrt(math.pow(deltaX, 2.0) + Math.pow(deltaY, 2.0));
  };

  var getSlopeIntercept = function(line) {
    return {
      slope: (function() {
        var deltaX = line.start.x - line.end.x;
        if(0 === deltaX) return NaN;
        var deltaY = line.start.y - line.end.y;
        return deltaY / deltaX;
      })(),
      perpendicularSlope: (function() {
          var original = this.slope();
          return isNaN(original) ? 0 : -1.0 / this.slope();
        })(),  
        yintercept: (function() {
          
        })()
      }
    }

  var pointPerpendicularTo = function(line, coeff) {
    var coeffNum = ((typeof(coeff) === 'function') ? coeff() : coeff) || 1.0;

    return {
      at: function(distance) {
        // create perpendicular line from the center of original line to the y-intercept
        // take the ratio of that line / distance
        // create a point along that line, ratio percentage
      }
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

    generateShoreline: function(sourceShape, args) {
      args = args || {};
      var generations = args.generations || 1;
      var shape = sourceShape;

      for(var i = 0; i <= generations; ++i) {
        var shoreline = {
          points: []
        };

        var aroundOne = function(num) { return 0.8 + Math.random() * 0.4 };

        for(var i = 0; i < shape.points.length - 1; ++i) {
          // when snowflakes live long enough, they evolve into glaciers
          var start = shape.points[i];
          var   end = shape.points[i + 1];
          shoreline.points.push(start);
          shoreline.points.push(pointOnLine({start: start, end: end}, 0.333, aroundOne));
          // push a point up to 20% the line's length above
          // or below the line, perpendicular
          shoreline.points.push(pointOnLine({start: start, end: end}, 0.667, aroundOne));
        };
      
        shoreline.points.push(shape.points[0]); 
        shape = shoreline;
      }

      return shape;
    }
  };

})(jQuery);

$(document).ready(function() {
  fractal.canvasContext(jQuery('#mapCanvas')[0].getContext('2d'));
  var shoreline = fractal.generateShoreline(
  {
    points: [
      { x: 100, y:100 },
      { x: 100, y:600 },
      { x: 600, y:600 },
      { x: 600, y:100 },
      { x: 100, y:100 }
    ]
  });
  fractal.drawMultiline(shoreline.points);
});
