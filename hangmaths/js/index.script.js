const inputs = document.querySelectorAll('.input')
const clueContainer = document.querySelector('#clues')
let code, clues, multiples = [3,4,5,7], lives = 0

function randomInt(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function roundToMultiple(number, multiple){
  return number % multiple === 0 ? number : number + (multiple - (number % multiple));
}

function sumOfDigits(num){
  return num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0)
}

function init() {
  resetInputs()
  clueContainer.innerHTML = ''
  clues = {
    'min100': randomInt(1,9) * 100,
    'mult' : multiples[randomInt(0,3)],
  }
  code = parseInt(roundToMultiple(clues['min100'], clues['mult']) + (clues['mult'] * randomInt(1, Math.floor(100 / clues['mult']))))
  clues['max100'] = clues['min100'] + 100
  clues['odd/even'] = code%2
  clues['sum'] = sumOfDigits(code)
  if(clues['odd/even'] === 0){
    clues[0] = `The number is even`
  }else{
    clues[0] = `The number is odd`
  }
  if(randomInt(0,1) === 0){
    clues[1] = `The number is more than ${clues['min100']}`
    clues[3] = `The number is less than ${clues['max100']}`
  }else{
    clues[1] = `The number is less than ${clues['max100']}`
    clues[3] = `The number is more than ${clues['min100']}`
  }
  clues[2] = `The number is a multiple of ${clues['mult']}`
  clues[4] = `The sum of numbers digits is ${clues['sum']}`
}

function displayClue(){
  let currClue = clueContainer.children.length;
  if(currClue < 5){
    let span = document.createElement('span')
      span.classList.add('clue')
      span.innerHTML = clues[currClue]
    clueContainer.appendChild(span)
  }
}

function submit(){
  if(inputs[0].innerHTML !== '' && inputs[1].innerHTML !== '' && inputs[2].innerHTML !== ''){
    let guess = parseInt(inputs[0].innerHTML + inputs[1].innerHTML + inputs[2].innerHTML)
    if(guess == code){
      clueContainer.innerHTML = ''
      let span = document.createElement('span')
        span.innerHTML = 'CORRECT'
      let button = document.createElement('button')
        button.innerHTML = 'Try Again'
        button.addEventListener('click', function(){
          init()
        })
      clueContainer.appendChild(span)
      clueContainer.appendChild(button)
    }else{
      lives++
      if(lives > 16){
        clueContainer.innerHTML = ''
        let span = document.createElement('span')
          span.innerHTML = 'GAME OVER'
        let button = document.createElement('button')
          button.innerHTML = 'Try Again'
          button.addEventListener('click', function(){
            init()
          })
        clueContainer.appendChild(span)
        clueContainer.appendChild(button)
      }else{
        if(lives%2 === 0) displayClue()
        checkInputs()
      }
    }
  }
}

function checkInputs(){
  const codeValues = [...code.toString()].map(Number);
  for (let i = 0; i < 3; i++) {
    if(parseInt(inputs[i].innerHTML) == parseInt(codeValues[i])){
      inputs[i].classList.add('correct')
      setTimeout(() => {
        inputs[i].classList.remove('correct')
      }, 1000);
    }else{
      inputs[i].classList.remove('correct')
      inputs[i].innerHTML = ''
    }
  }
}

function resetInputs(){
  lives = 0
  inputs.forEach(input => {
    input.innerHTML = ''
    input.classList.remove('focus')
    input.classList.remove('correct')
  })
  inputs[0].classList.add('focus')
}

init()
