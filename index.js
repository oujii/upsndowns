
$(document).ready( function() {

  var two = new Two({
	fullscreen: true
}).appendTo(document.body);

var length = 64;
var width = 950;
var height = 550;

var points = [];
for (var i = 0; i < length; i++) {
	var pct = i / (length - 1);
  var x = pct * width - width / 2;
  var y = (height / 2) * Math.sin(pct * Math.PI * 2 * 3.5);
  points.push(new Two.Anchor(x, y));
}
var wave = two.makeCurve(points, true);
wave.translation.set(two.width / 2, two.height / 2);
wave.noFill();
wave.stroke = 'rgb(255, 100, 100)';
wave.linewidth = 1.5;
wave.cap = 'round';

var text = two.makeText('HUMÖRET', 0, 0, {
  alignment: 'left'
});

two.update();	// Generate the SVG elements

text._renderer.elem.innerHTML = [
	'<textPath xlink:href="#', wave.id, '">', text.value, '</textPath>'
].join('');

two.bind('update', function(frameCount) {
	var vertices = wave.vertices;
  for (var i = 0; i < vertices.length; i++) {
    var offset = frameCount / 35;
  	var v = vertices[i];
    var pct = i / (vertices.length - 1);
    var y = (height / 2) * Math.sin(offset + pct * Math.PI * 2 * 3.5);
    v.y = y;
  }
});
two.play();
});








// window.onload = function() {
//   var canvas = document.getElementById("canvas"),
//       context = canvas.getContext("2d"),
//       width = canvas.width = window.innerWidth,
//       height = canvas.height = window.innerHeight;
//
//   var centerY = height * .5,
//       centerX = width * .5,
//       offset = height * .4,
//       speed = 0.1,
//       angle = 0;
//
//
//   render();
//
//   function render() {
//     var y = centerY + Math.sin(angle)*offset;
//     context.clearRect(0, 0, width, height);
//     context.beginPath();
//     context.arc(centerX, y, 50, 0, Math.PI*2, false);
//     context.fill();
//
//     angle += speed;
//     requestAnimationFrame(render);
//   }
//
//
// };
