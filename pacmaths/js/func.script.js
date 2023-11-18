function createGhost(color, xco, yco, dir){
    let xdir, ydir;
    switch (dir){
        case 'left':
            xdir = -Ghost.speed
            ydir = 0
            break
        case 'right':
            xdir = Ghost.speed
            ydir = 0
            break 
        case 'up':
            xdir = 0
            ydir = -Ghost.speed
            break
        case 'down':
            xdir = 0
            ydir = Ghost.speed
            break
        default:
            xdir = Ghost.speed
            ydir = 0
            break 
    }
    ghosts.push(
        new Ghost({
            position: {
                x: dimension * xco + dimension / 2,
                y: dimension * yco + dimension / 2,
            },
            velocity: {
                x: xdir,
                y: ydir,
            },
            color: color
        })
    )
}

function circleCollidesWithRectangle({circle, rectangle, extra = 3}){
    const padding = dimension/2 - circle.radius - extra
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)
}

function displayQuestion(type){
    let quest = createQuestion(level)
    questType = type
    display.show = true
    switch (level) {
        case 1:
            display.size.height = 9 * dimension
            break
        case 0:
        case 2:
        case 3:
            display.size.height = 7 * dimension
            break;
        default:
            display.size.height = 13 * dimension
            break;
    }
    display.size.width = 11 * dimension
    display.text.q = quest[0]
    answer = quest[1]
    numpad = true
    if(type === 'powerup'){
        display.text.h1 = 'Power Up'
        display.text.p = `Answer correctly to activate the powerup`
        submitBtn.addEventListener('click', submitPowerupAnswer, {once: true})
    }else if(type === 'ghost'){
        display.text.h1 = 'Ghost Attack'
        display.text.p = `Answer correctly to use a life.</br>
            Answer incorrectly and it's game over.`
        submitBtn.addEventListener('click', submitGhostAnswer, {once: true})
    }
    display.question()
}

function submitPowerupAnswer(){
    if(ansEl.value == answer){
        clearTimeout(scaredTimeout)
        ghosts.forEach(ghost => {
            ghost.scared = true
            scaredTimeout = setTimeout(() => {
                ghost.scared = false
            }, Ghost.scaredTime)
        })
    }
    display.hide()
    ansEl.value = ""
    numpad = false
    setTimeout(() => {
        paused = false
        animate()
    }, 500)
}

function submitGhostAnswer(){
    display.hide()
    if(ansEl.value == answer){
        lives--
        let ghost = ghosts[index]
        if(level > 4){
            let ghostDir = inverseDir(ghost.direction)
            let xpos = canvas.width / 2, ypos = canvas.height / 2;
            xpos = roundNum(2 * xpos - ghost.position.x,dimension)/dimension - 1
            ypos = roundNum(2 * ypos - ghost.position.y,dimension)/dimension - 1
            createGhost(ghost.color,xpos,ypos,ghostDir)
        }
        ghosts.splice(index,1)
        index = ""
        ansEl.value = ""
        numpad = false
        setTimeout(() => {
            paused = false
            animate()
        }, 500)
    }else{
        endGame()
    }
}

function increaseGhostSpeed(int){
    Ghost.speed += int * 0.25
}

function inverseDir(dir){
    if(dir === 'left') return 'right'
    if(dir === 'right') return 'lwft'
    if(dir === 'up') return 'down'
    if(dir === 'down') return 'up'
}

function appendNumber(num){
    ansEl.value = ansEl.value + num
}

function deleteNumber(){
    if(ansEl.value !== "") ansEl.value = ansEl.value.slice(0,-1)
}

function enterNumber(){
    switch (questType){
        case 'powerup':
            submitPowerupAnswer()
            break
        case 'ghost':
            submitGhostAnswer()
            break
    }
    questType = ""
}

function resetPlayer(){
    player.position.x = dimension + dimension / 2
    player.position.y = dimension + dimension / 2
    player.velocity.x = 0
    player.velocity.y = 0
    player.update()
}

function resetLevel(level){
    if(typeof map[level] !== 'undefined') createMap(level)
    else createMap(map.length - 1)
    switch (level){
        case 0:
            display.show = true
            display.size.height = 3 * dimension
            display.size.width = 7 * dimension
            display.text.h1 = 'Controls'
            display.text.p = `Use the arrow keys to navigate the maze and collect pellets.</br>
                Collect all the pellets to move to the next level.`
            break
        case 1:
            display.show = true
            display.size.height = 3 * dimension
            display.size.width = 7 * dimension
            display.text.h1 = 'Ghosts'
            display.text.p = `Ghosts can kill you.<br>Avoid them whilst colecting pellets`
            createGhost('Red',5,5,'right')
            break
        case 2:
            display.show = true
            display.size.height = 3 * dimension
            display.size.width = 7 * dimension
            display.text.h1 = 'Power Ups'
            display.text.p = `Power ups let you attack ghosts<br>
                Answer the question correct to disable ghosts for 5 seconds`
            createGhost('Red',9,5,'up')
            break
        case 3:
            lives = 4
            display.size.height = 3 * dimension
            display.size.width = 7 * dimension
            display.show = true
            display.text.h1 = 'Lives'
            display.text.p = `You have three lives. &#10084 &#10084 &#10084<br>
                Answer the question corretcly to use a life.<br>
                Answer incorrectly and it's game over`
            createGhost('Red',9,5,'up')
            createGhost('Green',9,5,'left')
            break
        case 4:
            display.show = true
            display.size.height = 3 * dimension
            display.size.width = 7 * dimension
            display.text.h1 = 'Level'
            display.text.p = `Collect all the pellets to move to the next level.<br>
                Each level will involve more and faster ghosts.<br>
                The questions will also get more difficult as the game progresses.`
            createGhost('Green',9,11,'left')
            break
        case 10:
            createGhost('Navy',9,1,'left')
        case 9:
            createGhost('Teal',1,11,'up')
        case 8:
            createGhost('Purple',9,11,'up')
        case 7:
            createGhost('Pink',9,1,'down')
        case 6:
            createGhost('Green',1,11,'right')
        case 5:
            createGhost('Red',9,11,'left')
        default:
            display.show = false
            display.text.h1 = ''
            display.text.p = ''
            display.text.q = ''
            break
    }
    if(level > 10) increaseGhostSpeed(level - 10)
    display.update()
}

function endGame(){
    gameOver = true
    cancelAnimationFrame(animationId)
    switch (level) {
        case 1:
            display.size.width = 11 * dimension
            display.size.height = 9 * dimension
            break;
        case 2:
        case 3:
            display.size.width = 11 * dimension
            display.size.height = 7 * dimension
            break;    
        default:
            display.size.width = 11 * dimension
            display.size.height = 13 * dimension
            break; 
            break;
        }
    display.notice()
}