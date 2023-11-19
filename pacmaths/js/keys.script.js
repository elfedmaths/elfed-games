document.addEventListener('keydown', ({key}) => {
    switch(key){
        case 'ArrowUp':
            keys.up.pressed = true
            lastKey = key
            break
        case 'ArrowLeft':
            keys.left.pressed = true
            lastKey = key
            break
        case 'ArrowDown':
            keys.down.pressed = true
            lastKey = key
            break
        case 'ArrowRight':
            keys.right.pressed = true
            lastKey = key
            break
    }
})

document.addEventListener('keyup', ({key}) => {
    switch(key){
        case 'ArrowUp':
            keys.up.pressed = false
            break
        case 'ArrowLeft':
            keys.left.pressed = false
            break
        case 'ArrowDown':
            keys.down.pressed = false
            break
        case 'ArrowRight':
            keys.right.pressed = false
            break
        case 'Backspace':
            if(numpad) deleteNumber()
            break
        case 'Enter':
            if(gameOver) location.reload()
            else if(numpad) enterNumber()
            break
        default:
            if(document.activeElement !== document.querySelector("#answer-input") &&
                numpad && /(^[0-9]$)/.test(key)){
                     appendNumber(key);
            }
            break
    }
})

navCont.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});
  
navCont.addEventListener('touchmove', function (e) {
    e.preventDefault();
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
});
  
navCont.addEventListener('touchend', function () {
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            keys.right.pressed = true
            lastKey = 'ArrowRight'
            setTimeout(() => {keys.right.pressed = false}, 1)
        } else {
            keys.left.pressed = true
            lastKey = 'ArrowLeft'
            setTimeout(() => {keys.left.pressed = false}, 1)
        }
    } else {
        if (deltaY > 0) {
            keys.down.pressed = true
            lastKey = 'ArrowDown'
            setTimeout(() => {keys.down.pressed = false}, 1)
        } else {
            keys.up.pressed = true
            lastKey = 'ArrowUp'
            setTimeout(() => {keys.up.pressed = false}, 1)
        }
    }
  });