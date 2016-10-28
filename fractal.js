var fractal = (function($) {

  var _cc;

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
        drawLine(start.x, start.y, end.x, end.y)
      }
    };
  };

})(jQuery);

$(document).ready(function() {
  fractal.canvasContext(jQuery('#mapCanvas')[0].getContext('2d'));
  fractal.drawMultiline([
    {x: 100, y: 100}, {x: 300, y: 100}, {x: 300, y: 300 }, {x: 100, y: 300}, {x: 100, y: 100}
  ]);
});
