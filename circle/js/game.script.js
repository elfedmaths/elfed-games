const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
let coords = [], coord = {x: 0, y: 0}, error, highScore = 0, score = 0, color = '#ACD3ED'

window.addEventListener('resize', resize)
function resize() {
    c.canvas.width = window.innerWidth
    c.canvas.height = window.innerHeight
}
resize()

canvas.addEventListener('mousedown', start)
canvas.addEventListener('touchstart', start)
canvas.addEventListener('mouseup', stop)
canvas.addEventListener('touchend', stop)

function start(event) {
    c.clearRect(0, 0, canvas.width, canvas.height)
    localStorage.removeItem('mouse-data')
    document.getElementById('error').innerHTML = ""
    document.getElementById('complete-stat').innerHTML = "Complete: 0.00%"
    coords = [], coord = {x: 0, y: 0}, score = 0, error = ""
    color = randColor()
    reposition(event)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('touchmove', draw)
}

function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft
    coord.y = event.clientY - canvas.offsetTop
    coords.push({x:coord.x, y:coord.y})
}

function draw(event) {
    c.beginPath()
    c.lineWidth = 5
    c.lineCap = 'round'
    c.strokeStyle = color
    c.moveTo(coord.x, coord.y)
    reposition(event)
    c.lineTo(coord.x, coord.y)
    c.stroke()
}

function stop() {
    canvas.removeEventListener('mousemove', draw)
    canvas.removeEventListener('touchmove', draw)
    processMath() 
    showData()
}

function showData(){
    if(error){
        document.getElementById('error').innerHTML = error
        document.getElementById('complete-stat').innerHTML = "Complete: 0.00%"
    }else{
        document.getElementById('complete-stat').innerHTML = "Complete: " + score.toFixed(2) + "%"
    }
    if(highScore > 0){
        document.getElementById('high-score').innerHTML = "High score: " + highScore.toFixed(2) + "%"
    }
}

function randColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}