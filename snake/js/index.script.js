// Game variables
var canvas = document.querySelector("#gameCanvas");
var ctx = canvas.getContext("2d");
var startContainer = document.querySelector("#start-container");
var topicBtn = document.querySelector("#topic-opt");
var startBtn = document.querySelector("#start-game");
var scoreBtns = document.querySelectorAll("#score");
var scoreHigh = document.querySelector("#high-score");
var topicLabel = document.querySelector("#topic");
var snake, gameLoop, score, snakeSize = 20, direction, items, color, startX, startY, endX, endY;
var ansArr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

function setGame(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake = [
    { x: round20(canvas.width/2), y: round20(canvas.width/2) },
    { x: round20(canvas.width/2) - 20, y: round20(canvas.width/2) },
    { x: round20(canvas.width/2) - 40, y: round20(canvas.width/2) },
    { x: round20(canvas.width/2) - 60, y: round20(canvas.width/2) },
  ]
  score = 0
  direction = "right"
  color = randColor()
  canvas.classList.remove("red")
  generateFood()
  updateBoard()
}

function startGame(){
  gameLoop = setInterval(update, 100);
}

function round20(number) {
  return Math.round(number / 20) * 20;
}

function generateFood() {
  var answers = generateAnswers();
  items = [
    {
      int : answers[0],
      x : round20(Math.floor(Math.random() * (canvas.width - 39))) + 20,
      y : round20(Math.floor(Math.random() * (canvas.height - 39))) + 20,
    },
    {
      int : answers[1],
      x : round20(Math.floor(Math.random() * (canvas.width - 39))) + 20,
      y : round20(Math.floor(Math.random() * (canvas.height - 39))) + 20,
    },
    {
      int : answers[2],
      x : round20(Math.floor(Math.random() * (canvas.width - 39))) + 20,
      y : round20(Math.floor(Math.random() * (canvas.height - 39))) + 20,
    }
  ]
}

function update() {
  var head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= snakeSize;
      break;
    case "down":
      head.y += snakeSize;
      break;
    case "left":
      head.x -= snakeSize;
      break;
    case "right":
      head.x += snakeSize;
      break;
  }
  snake.unshift(head);
  checkItems(head);
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    checkCollision(head)
  ) {
    endGame()
  }
  updateBoard()
}

function updateBoard(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  snake.forEach(function (segment) {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
  ctx.font = snakeSize + "px Arial";
  ctx.fillStyle= "#000"
  for (var i = 0; i < items.length; i++) {
    ctx.fillText(items[i].int, items[i].x, items[i].y + snakeSize)
  }
  scoreBtns.forEach((scoreBtn) => scoreBtn.innerHTML = score)
}

function checkCollision(head) {
  for (var i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function checkItems(head){
  var checked = true
  items.forEach((item, index) => {
    if (head.x === item.x && head.y === item.y) {
      if(index === 0){
        score += 10;
        flash("green");
      }else{
        score -= 50;
        if(score < 0) score = 0;
        flash("red");
      }
      generateFood();
      checked = false;
    }
  }); 
  if(checked) {
    snake.pop();
  }
}

function handleKeydown(event) {
  var key = event.keyCode;
  switch (key) {
    case 37:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 40:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}

function highScore(){
  var highScore = scoreHigh.innerHTML
  if(score > highScore) scoreHigh.innerHTML = score
}

function flash(option){
  canvas.classList.add(option)
  setTimeout(() => {
    canvas.classList.remove(option)
  }, "1000");
}

function endGame(){
  clearInterval(gameLoop)
  highScore()
  canvas.classList.add("red")
  startBtn.innerHTML = "Try Again"
  startContainer.classList.remove("hidden")
}

function generateAnswers(){
  var int = randomInt(0,ansArr.length - 1)
  var correct = ansArr[int]
  var wrong1 = randomExclude(1,99,ansArr)
  var wrong2 = randomExclude(1,99,ansArr)
  return [correct, wrong1, wrong2]
}

function selectLevel(){
  var topic = topicBtn.value
  var topicText
  if(topic){
    switch (topic) {
      case 'prime':
        ansArr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
        topicText = "Prime Numbers"
        break;
      case 'square':
        ansArr = [1, 4,9, 16, 25, 36, 49, 64, 81]
        topicText = "Square Numbers"
        break;
      case 'triangle':
        ansArr = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91]
        topicText = "Triangle Numbers"
        break;
      default:
        break;
    }
    topicLabel.innerHTML = topicText
    return true;
  }
  return false;
}

function randomInt(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomExclude(min, max, excludeArray) {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeArray.includes(randomNum));
  return randomNum;
}

function randColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

startBtn.addEventListener("click", function(){
  if(selectLevel()){
    startContainer.classList.add("hidden")
    var subScore = startContainer.querySelector(".hidden")
    if(subScore) subScore.classList.remove("hidden")
    setGame()
    startGame()
  }else{
    topicBtn.classList.add("error")
    setTimeout(() => {
      topicBtn.classList.remove("error")
    }, "1000");
  }
})

canvas.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', function (e) {
  e.preventDefault();
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', function () {
  var deltaX = endX - startX;
  var deltaY = endY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      direction = "right";
    } else {
      direction = "left";
    }
  } else {
    if (deltaY > 0) {
      direction = "down";
    } else {
      direction = "up";
    }
  }
});

document.addEventListener("keydown", handleKeydown);