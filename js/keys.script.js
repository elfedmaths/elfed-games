addEventListener('keydown', ({key}) => {
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

addEventListener('keyup', ({key}) => {
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
            if(numpad && /(^[0-9]$)/.test(key)) appendNumber(key);
            break
    }
})