let code = '', exact = 0, partial = 0

function randomInt(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function genCode() {
  for (let i = 0; i < 4; i++) {
    code += randomInt(1,9)
  }
}
  
function evaluate(guess) {
  exact = 0
  partial = 0
  for (let i = 0; i < code.length; i++) {
    if (guess[i] === code[i]) exact++
    else if (code.includes(guess[i])) partial++
  }
  showResponse()
  if(exact !== 4) newRow()
}

function showResponse(){
  var activeRow = document.querySelector('.main-row.active')
  var responses = activeRow.querySelectorAll('.response')
  let responseArr = []
  if(exact > 0){
    for(i = 1; i <= exact; i++) responseArr.push('exact')
  }
  if(partial > 0){
    for(i = 1; i <= partial; i++) responseArr.push('partial')
  }
  responseArr.forEach((responseVal,i) => {
    responses[i].classList.add(responseVal)
  });
}

function submit(){
  var activeRow = document.querySelector('.main-row.active')
  var n1 = activeRow.querySelector('.n1').innerHTML
  var n2 = activeRow.querySelector('.n2').innerHTML
  var n3 = activeRow.querySelector('.n3').innerHTML
  var n4 = activeRow.querySelector('.n4').innerHTML
  var guess = "" + n1 + n2 + n3 + n4
  if(guess.length === 4){
    evaluate(guess)
  }
}

genCode()
  