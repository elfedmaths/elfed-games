const dice1 = document.querySelector('#dice-1')
const dice2 = document.querySelector('#dice-2')
const tileContainer = document.querySelector('#tile-container')
const tiles = tileContainer.querySelectorAll('.tile')
const dialog = document.querySelector('dialog')
const dialogHeading = dialog.querySelector('#heading')
const dialogMessage = dialog.querySelector('#message')
let gameOver = false, roll1, roll2, currentSum = 0, tileArr;
let x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

function randomInt(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function init(){
  dialog.showModal()
  gameOver = false
  currentSum = 0
  tileArr  = Array(12).fill(0)
  tiles.forEach(tile => {
    tile.classList = 'tile'
  })
  dice1.classList.add('roll')
  dice2.classList.add('roll')
}

function rollDice(){
  if(gameOver) init()
  if(currentSum === 0){
    roll1 = randomInt(1,6)
    roll2 = randomInt(1,6)
    dice1.classList.remove('roll')
    dice2.classList.remove('roll')
    rotateDice(roll1, roll2)
  }
}

function validRoll(sum, update = false){
  currentSum = sum
  let validArr = findValues(getIndexes(tileArr), sum)
  let tilesDown = tileArr.reduce((total, num) => total + num, 0)
  if(tilesDown === -12){
    gameOver = true
    dialogHeading.innerHTML = 'WINNNER'
    dialogMessage.innerHTML = 'You had 0.3622% chance of winning'
    init()
  }else if(validArr.length === 0 && update){
    gameOver = true
    dialogHeading.innerHTML = 'GAME OVER'
    dialogMessage.innerHTML = 'You had 99.6378% chance of losing'
    init()
  }else{
    tileArr.forEach((tile, i) => {
      if(tile < 0){
        tiles[i].classList = 'tile down'
      }else if(validArr.includes(i + 1)){
        tileArr[i] = 1
        tiles[i].classList = 'tile active'
      }else{
        tileArr[i] = 0
        tiles[i].classList = 'tile'
      }
    })
  }
}

function getIndexes(arr) {
  return arr.reduce((indexes, value, index) => {
      if (value >= 0) {
          indexes.push(index + 1);
      }
      return indexes;
  }, []);
}

function findValues(numbers, target) {
  const results = new Set();
  function findSubset(current, remaining, target) {
    const sum = current.reduce((acc, num) => acc + num, 0);
    if (sum > target) return;
    if (sum === target) {
      const uniqueElements = new Set(current);
      if (uniqueElements.size === current.length) {
        current.forEach(num => results.add(num));
      }
      return;
    }
    if (remaining.length > 0) {
      findSubset([...current, remaining[0]], remaining.slice(1), target);
      findSubset([...current], remaining.slice(1), target);
    }
  }
  findSubset([], numbers, target);
  return Array.from(results);
}

function rotateDice(roll1, roll2) {
  let speed = 1;
  const duration = 1000;
  const faces = {
    1: { x: 0, y: 0, z: 0 },
    2: { x: 0, y: 90, z: 0 },
    3: { x: 90, y: 0, z: 0 },
    4: { x: 270, y: 0, z: 0 },
    5: { x: 0, y: 270, z: 0 },
    6: { x: 0, y: 180, z: 0 },
  };
  const start = performance.now();
  const step = function () {
    const now = performance.now();
    const delta = Math.min((now - start) / duration, 1);
    if (delta < 1) {
      if (delta < 1 / 2) {
        speed = (speed + 5) > 50 ? 50 : speed + 5;
      } else {
        speed = (speed - 1) < 1 ? 1 : speed - 1;
      }
      const randomAxis1 = Math.random(), randomAxis2 = Math.random();
      if (randomAxis1 < 1 / 3) x1 = (x1 + speed) % 360;
      else if (randomAxis1 < 2 / 3) y1 = (y1 + speed) % 360;
      else z1 = (z1 + speed) % 360;
      if (randomAxis2 < 1 / 3) x2 = (x2 + speed) % 360;
      else if (randomAxis2 < 2 / 3) y2 = (y2 + speed) % 360;
      else z2 = (z2 + speed) % 360;
    } else {
      if (x1 !== faces[roll1].x) x1 = Math.round(x1 + speed) % 360;
      if (x2 !== faces[roll2].x) x2 = Math.round(x2 + speed) % 360;
      if (y1 !== faces[roll1].y) y1 = Math.round(y1 + speed) % 360;
      if (y2 !== faces[roll2].y) y2 = Math.round(y2 + speed) % 360;
      if (z1 !== faces[roll1].z) z1 = Math.round(z1 + speed) % 360;
      if (z2 !== faces[roll2].z) z2 = Math.round(z2 + speed) % 360;
      speed = (speed - 0.5) < 1 ? 1 : speed - 0.1;
    }
    dice1.style.transform = `rotateX(${x1}deg) rotateY(${y1}deg) rotateZ(${z1}deg)`;
    dice2.style.transform = `rotateX(${x2}deg) rotateY(${y2}deg) rotateZ(${z2}deg)`;
    if (
      x1 !== faces[roll1].x || y1 !== faces[roll1].y || z1 !== faces[roll1].z ||
      x2 !== faces[roll2].x || y2 !== faces[roll2].y || z2 !== faces[roll2].z
    ) {
      requestAnimationFrame(step);
    }else{
      validRoll(roll1+roll2, true)
    }
  };
  step();
}

tiles.forEach((tile, i) => {
  tile.addEventListener('click', function(){
    if(tileArr[i] > 0 && currentSum !== 0 && currentSum - (i + 1) >= 0){
      tile.classList.add('down')
      tileArr[i] = -1
      currentSum -= i + 1
      if(currentSum === 0){
        dice1.classList.add('roll')
        dice2.classList.add('roll')
      }
      validRoll(currentSum)
    }
  })
})

dice1.addEventListener('click', rollDice)
dice2.addEventListener('click', rollDice)

init()