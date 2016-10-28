var fractal = (function($, canvasContext) {
  var ret = function() {};
  
  ret.drawLine = function(x1, y1, x2, y2) {
    var context = canvasContext.getDrawingContext();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();    
  }

  return ret;
})(jQuery, jQuery('#mapCanvas')[0].getContext('2d'));

$(document).ready(function() {
  console.log('jQuery is loaded.');
  fractal.drawLine(100, 100, 300, 100);
});
