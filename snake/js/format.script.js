var c = document.getElementById('gameCanvas');
var ct = c.getContext('2d');
var container = c.parentNode;

window.addEventListener('resize', respondCanvas);

function respondCanvas() {
  var dimension = Math.min(container.offsetWidth, container.offsetHeight);
  c.width = Math.floor(Math.round(dimension / 25)) * 25;
  c.height = Math.floor(Math.round(dimension / 25)) * 25;
}

respondCanvas();  