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

  var getVertex

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
        
        return { start: intercept, end: yIntercept};
      }
    }
  };

  var pointPerpendicularTo = function(line, intercept, coeff) {
    var coeffNum = ((typeof(coeff) === 'function') ? coeff() : coeff) || 1.0;

    return {
      at: function(distance) {
        var perpendicularLine = getPerpendicularLine(line).interceptingAt(intercept);
        var ratio = lineLength(perpendicularLine) / lineLength(line);
        var ret = pointOnLine(perpendicularLine, distance * ratio, coeffNum);
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
          var getVertexFn = pointPerpendicularTo(line, midpoint, 1.0);
          var vertex = getVertexFn.at(Math.random() * volatility);
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

$(document).ready(function() {
  fractal.canvasContext(jQuery('#mapCanvas')[0].getContext('2d'));
  var shoreline = fractal.generateShoreline(
  {
    points: [
      { x: 100, y: 100 },
      { x: 100, y: 400 },
      { x: 400, y: 400 },
      { x: 400, y: 100 },
      { x: 100, y: 100 }
    ]
  },
  { 
    generations: 1 
  }
  );
  fractal.drawMultiline(shoreline.points);
});
