var c = document.getElementById('gameCanvas');
var ct = c.getContext('2d');
var container = c.parentNode;

window.addEventListener('resize', respondCanvas);

function respondCanvas() {
    var dimension = Math.min(container.offsetWidth, container.offsetHeight);
    c.width = round20(dimension);
    c.height = round20(dimension);
}

respondCanvas();  