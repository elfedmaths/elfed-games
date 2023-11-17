// Game variables
var canvas = document.querySelector("#gameCanvas")
var ctx = canvas.getContext("2d")
var startContainer = document.querySelector("#start-container")
var touchContainer = document.querySelector("#touch-container")
var topicBtn = document.querySelector("#topic-opt")
var startBtn = document.querySelector("#start-game")
var scoreBtns = document.querySelectorAll("#score")
var scoreHigh = document.querySelector("#high-score")
var topicLabel = document.querySelector("#topic")
var snake, gameLoop, score, gridSize, snakeSize, direction, items, color, startX, startY, endX, endY
var ansArr = ["X"]

function setGame(){
  gridSize = 25
  snakeSize = 25
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake = [
    { x: roundNum(canvas.width/2, gridSize), y: roundNum(canvas.width/2, gridSize) },
    { x: roundNum(canvas.width/2, gridSize) - (gridSize * 1), y: roundNum(canvas.width/2, gridSize) },
    { x: roundNum(canvas.width/2, gridSize) - (gridSize * 2), y: roundNum(canvas.width/2, gridSize) },
    { x: roundNum(canvas.width/2, gridSize) - (gridSize * 3), y: roundNum(canvas.width/2, gridSize) },
  ]
  score = 0
  direction = "right"
  color = randColor()
  canvas.classList.remove("red")
  generateItems()
  updateBoard()
}

function startGame(){
  gameLoop = setInterval(update, 100);
}

function generateItems() {
  var answers = generateAnswers();
  items = [
    {
      int : answers[0],
      x : roundNum(Math.floor(Math.random() * (canvas.width - (2 * gridSize - 1))), gridSize) + gridSize,
      y : roundNum(Math.floor(Math.random() * (canvas.height - (2 * gridSize - 1))), gridSize) + gridSize,
    },
    {
      int : answers[1],
      x : roundNum(Math.floor(Math.random() * (canvas.width - (2 * gridSize - 1))), gridSize) + gridSize,
      y : roundNum(Math.floor(Math.random() * (canvas.height - (2 * gridSize - 1))), gridSize) + gridSize,
    },
    {
      int : answers[2],
      x : roundNum(Math.floor(Math.random() * (canvas.width - (2 * gridSize - 1))), gridSize) + gridSize,
      y : roundNum(Math.floor(Math.random() * (canvas.height - (2 * gridSize - 1))), gridSize) + gridSize,
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
  ctx.textAlign = "center";
  ctx.font = snakeSize + "px Arial";
  ctx.fillStyle= "#000"
  for (var i = 0; i < items.length; i++) {
    ctx.fillText(items[i].int, items[i].x + snakeSize / 2, items[i].y + snakeSize)
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
        checked = false;
      }else{
        score -= 50;
        if(score < 0) score = 0;
        flash("red");
      }
      generateItems();
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

touchContainer.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

touchContainer.addEventListener('touchmove', function (e) {
  e.preventDefault();
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
});

touchContainer.addEventListener('touchend', function () {
  var deltaX = endX - startX;
  var deltaY = endY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      if (direction !== "left") {
        direction = "right";
      }
    } else {
      if (direction !== "right") {
        direction = "left";
      }
    }
  } else {
    if (deltaY > 0) {
      if (direction !== "up") {
        direction = "down";
      }
    } else {
      if (direction !== "down") {
        direction = "up";
      }
    }
  }
});

document.addEventListener("keydown", handleKeydown);