const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let coord = { x: 0, y: 0 };
let color = '#ACD3ED';

document.addEventListener('mousedown', start);
document.addEventListener('mouseup', stop);
window.addEventListener('resize', resize);

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
  
resize();

function start(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearData();
    document.addEventListener('mousemove', draw);
    reposition(event);
}

function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
    addData(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function stop() {
    document.removeEventListener('mousemove', draw);
    var data = math();
    showData(data);
}

function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}

function addData(x, y){
    if (localStorage.getItem('mouse-data') === null) {
        var data = [];
    }else{
        var data = JSON.parse(localStorage.getItem('mouse-data'));
    }
    data.push([x, y]);
    try {
        localStorage['mouse-data'] = JSON.stringify(data);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
    }
}

function clearData(){
    localStorage.removeItem('mouse-data');
    resetData();
}

function fetchData(){
    if (localStorage.getItem('mouse-data') === null) {
        var data = [];
    }else{
        var data = JSON.parse(localStorage.getItem('mouse-data'));
    }
    return data;
}

function showData(data){
    if(data['error']){
        document.getElementById('error').innerHTML = data['error'];
    }else{
        if(data['complete']){
            document.getElementById('complete-stat').innerHTML = data['complete'];
            document.getElementById('high-score').innerHTML = data['high'];
        }
    }
}

function resetData(){
    document.getElementById('error').innerHTML = "";
    document.getElementById('complete-stat').innerHTML = "0%";
    color = randColor();
}

function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }