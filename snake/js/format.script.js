var c = document.getElementById('gameCanvas');
var ct = c.getContext('2d');
var container = c.parentNode;

window.addEventListener('resize', respondCanvas);

function respondCanvas() {
  var dimension = Math.min(container.offsetWidth, container.offsetHeight) - 40;
  c.width = Math.floor(Math.round(dimension / 20)) * 20;
  c.height = Math.floor(Math.round(dimension / 20)) * 20;
}

respondCanvas();  