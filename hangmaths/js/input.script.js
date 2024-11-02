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
                /(^[0-9]$)/.test(key)){
                    enterNum(key)
            }
            break
    }
})

function moveLeft(){
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
    let activeInput = document.querySelector('.input.focus')
    activeInput.innerHTML = num  
    moveNext()  
}

function resetListeners(){
    let inputs = document.querySelectorAll('.input')
    inputs.forEach(input => {
        input.addEventListener('click', focusInput)
    });
}

function focusInput(e){
    let activeInput = document.querySelector('.input.focus')
    activeInput.classList.remove('focus')
    e.target.classList.add('focus');
}

resetListeners()