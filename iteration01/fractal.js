var fractal = (function($) {
  var _cc = undefined;

  var describeVertex = function(originalLine, perpendicularLine, intercept, newPoint) {
    var ols = originalLine.start;
    var ole = originalLine.end;
    console.log(`Original line: (${ols.x},${ols.y}) -> (${ole.x},${ole.y})`)

    var pls = perpendicularLine.start;
    var ple = perpendicularLine.end;
    console.log(`Perpendicular line: (${pls.x},${pls.y}) -> (${ple.x},${ple.y})`);
    
    console.log(`Intercept: (${intercept.x},${intercept.y})`);
    console.log(`Vertex: (${newPoint.x},${newPoint.y})`);
    console.log('');
  }

  var getVertex = function(intercept, slope, offset, inversionFn) {
    // Special cases for m at 0 and NaN
    if(slope === 0)  return { x: intercept.x + offset * inversionFn(), y: intercept.y };
    if(isNaN(slope)) return { x: intercept.x, y: intercept.y + offset * inversionFn() };

    var squaredOffset = Math.pow(offset, 2.0);
    var deltaX = Math.sqrt(squaredOffset / (slope + 1.0));
    var deltaY = deltaX / slope;

    return { x: intercept.x + deltaX * inversionFn(), y: intercept.y + deltaY * inversionFn() }
  }

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
    return Math.sqrt(Math.pow(deltaX, 2.0) + Math.pow(deltaY, 2.0));
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
          var original = this.slope;
          return isNaN(original) ? 0 : -1.0 / this.slope;
      })(),  
      yintercept: (function() {
        var m = this.slope;
        if(isNaN(m)) return line.start.x;
        return line.start.y - m * line.start.x;
      })()
    };
  }

  var getPerpendicularLine = function(line) {
    return {
      interceptingAt: function(intercept) {
        var originalSlopeIntercept = getSlopeIntercept(line);
        var slope = originalSlopeIntercept.perpendicularSlope;

        if(isNaN(slope)) {
          return { start: intercept, end: { x: 0, y: intercept.y }};
        }

        if(0 === slope) {
          return { start: intercept, end: { x: intercept.x, y: 0 }};
        };

        var yIntercept = (function(m) {
          var x = (intercept.x - intercept.y) / m;
          return {x: x, y: 0};
        })(slope);
        
        var ret = { start: intercept, end: yIntercept};
        drawLine(ret.start.x, ret.start.y, ret.end.x, ret.end.y, 'purple');
        return ret;
      }
    }
  };

  var pointPerpendicularTo = function(line, intercept, coeff) {
    var coeffNum = ((typeof(coeff) === 'function') ? coeff() : coeff) || 1.0;

    return {
      at: function(distance) {
        var perpendicularLine = getPerpendicularLine(line).interceptingAt(intercept);
        var originalSlopeIntercept = getSlopeIntercept(line);
        var pSlope = originalSlopeIntercept.perpendicularSlope;

        var ret = getVertex(intercept, pSlope, distance * coeffNum, 
          function() {
            return Math.random() > 0.5 ? 1.0 : -1.0 
        });
        describeVertex(line, perpendicularLine, intercept, ret);
        return ret;
      }
    }
  }

  return {
    canvasContext: function(cc) {
    if(cc) _cc = cc;
    return _cc;
    },

    drawLine: function(x1, y1, x2, y2, color) {
      _cc.lineWidth = 2;
      _cc.strokeStyle = color || 'black';
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
      var volatility = args.volatility || 0.2;
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
          var  line = {start: start, end: end};

          shoreline.points.push(start);
          shoreline.points.push(pointOnLine(line, 0.333, aroundOne));

          var midpoint = pointOnLine(line, 0.5, aroundOne);
          var vertex = pointPerpendicularTo(line, midpoint, 1.0).at(Math.random() * volatility);
          shoreline.points.push(vertex);

          shoreline.points.push(pointOnLine(line, 0.667, aroundOne));
        };
      
        shoreline.points.push(shape.points[0]); 
        shape = shoreline;
      }

      return shape;
    }
  };

})(jQuery);

module.exports = fractal;
