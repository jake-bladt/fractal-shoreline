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
