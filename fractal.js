var fractal = (function($) {
  return function() {
    var _cc;

    this.canvasContext = function(cc) {
      if(cc) _cc = cc;
      return _cc;
    },

    this.drawLine = function(x1, y1, x2, y2) {
      var context = _cc.getDrawingContext();
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();    
  }

  return ret;
})(jQuery);

$(document).ready(function() {
  fractal.canvasContext(jQuery('#mapCanvas')[0].getContext('2d'));
  fractal.drawLine(100, 100, 300, 100);
});
