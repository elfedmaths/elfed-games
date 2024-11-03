document.addEventListener('keyup', ({key}) => {
    switch(key){
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        case 'Enter':
            submit()
            break
        case 'Backspace':
            enterNum("")
            moveLeft()
            break
        default:
            if(document.activeElement !== document.querySelector(".input") &&
                /(^[1-9]$)/.test(key)){
                    enterNum(key)
            }
            break
    }
})

function moveLeft(){
    let activeRow = document.querySelector('.main-row.active')
    let inputs = activeRow.querySelectorAll('.input')
    mainLoop: for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].classList.contains('focus')){
            if(i !== 0){
                inputs[i].classList.remove('focus')
                inputs[i-1].classList.add('focus')
                break mainLoop
            }
        }
    }
}

function moveRight(){
    let activeRow = document.querySelector('.main-row.active')
    let inputs = activeRow.querySelectorAll('.input')
    mainLoop: for (let i = inputs.length - 1; i >= 0; i--) {
        if(inputs[i].classList.contains('focus')){
            if(i !== inputs.length - 1){
                inputs[i].classList.remove('focus')
                inputs[i+1].classList.add('focus')
                break mainLoop
            }
        }
    }
}

function moveNext(){
    let activeRow = document.querySelector('.main-row.active')
    let inputs = activeRow.querySelectorAll('.input')
    let emptyArr = [], activeIndex
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].classList.contains('focus')){
            activeIndex = i
        }
        if(inputs[i].innerHTML === ""){
            emptyArr.push(1)
        }else{
            emptyArr.push(0)
        }
    }
    let nextEmpty = emptyArr.indexOf(1,activeIndex)
    if(nextEmpty < 0) nextEmpty = emptyArr.indexOf(1,0)
    if(nextEmpty >= 0){
        inputs[activeIndex].classList.remove('focus')
        inputs[nextEmpty].classList.add('focus')
    }
}

function enterNum(num){
    let activeRow = document.querySelector('.main-row.active')
    let activeInput = activeRow.querySelector('.input.focus')
    activeInput.innerHTML = num  
    moveNext()  
}

function newRow(){
    let mainCol = document.querySelector('#main-game')
    let activeRow = mainCol.querySelector('.main-row.active')
    let row = document.createElement('div')
        row.classList.add('main-row','active')
    let inputRow = document.createElement('div')
        inputRow.classList.add('input-row')
    let responseRow = document.createElement('div')
        responseRow.classList.add('response-row')
    for (let i = 1; i <= 4; i++) {
        let inputSpan = document.createElement('span')
            inputSpan.classList.add(`input`, `n${i}`)
        if(i === 1) inputSpan.classList.add(`focus`)
        inputRow.appendChild(inputSpan)
        let responseSpan = document.createElement('span')
            responseSpan.classList.add(`response`,`n${i}`)
        responseRow.appendChild(responseSpan)
    }
    row.appendChild(inputRow)
    row.appendChild(responseRow)
    mainCol.appendChild(row)
    activeRow.classList.remove('active')
    resetListeners()
    scrollDiv()
}

function scrollDiv(){
    let parentDiv = document.querySelector('#main-game')
    let appendedDiv = parentDiv.querySelector('.main-row.active')
    parentDiv.scrollTop = (appendedDiv.offsetTop - parentDiv.clientHeight / 2) + (appendedDiv.clientHeight / 2);
}

function resetListeners(){
    let mainCol = document.querySelector('#main-game')
    let prevRow = mainCol.lastElementChild
    let prevInputs = prevRow.querySelectorAll('.input')
    let activeRow = mainCol.querySelector('.main-row.active')
    let inputs = activeRow.querySelectorAll('.input')
    prevInputs.forEach(prevInput => {
        prevInput.removeEventListener('click', focusInput)
    })
    inputs.forEach(input => {
        input.addEventListener('click', focusInput)
    });
}

function focusInput(e){
    let mainCol = document.querySelector('#main-game')
    let activeRow = mainCol.querySelector('.main-row.active')
    let activeInputs = activeRow.querySelectorAll('.input.focus')
    activeInputs.forEach(activeInput => {
        activeInput.classList.remove('focus')
    })
    e.target.classList.add('focus');
}

resetListeners()