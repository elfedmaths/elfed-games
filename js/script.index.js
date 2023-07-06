const mainContainer = document.querySelector('#main')
const scoreEl = document.querySelector('#score-elem')
const levelEl = document.querySelector('#level-elem')
const livesEl = document.querySelectorAll('.lives-elem')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 440
canvas.height = 520

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

const keys = {
    up: { pressed: false },
    left: { pressed: false },
    down: { pressed: false },
    right: { pressed: false }
}

let pellets = []
let powerUps = []
let boundaries = []
let ghosts = []
let displays = []

let animationId
let lastKey = ''
let score = 0
let paused = false
let level = 1
let lives = 3
let ghostCount = 0
let scaredTimeout

function createImage(src){
    const image = new Image()
    image.src = `./img/${src}.png`
    image.width = Boundary.width
    image.height = Boundary.height
    return image
}

function createGhost(color, xco, yco){
    ghosts.push(
        new Ghost({
            position: {
                x: Boundary.width * xco + Boundary.width / 2,
                y: Boundary.height * yco + Boundary.height / 2,
            },
            velocity: {
                x: Ghost.speed,
                y: 0,
            },
            color: color
        })
    )
}

function circleCollidesWithRectangle({circle, rectangle}){
    const padding = Boundary.width/2 - circle.radius - 1
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding
        &&  circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)
}

function createQuestion(){
    var int1 = Math.floor(Math.random() * 10) + 1;
        int2 = Math.floor(Math.random() * 10) + 1;
    let question = prompt(int1 + " + " + int2)
    if (question == int1 + int2) return true
    return false
}

function increaseGhostSpeed(){
    Ghost.speed += 0.25
}

function animate(){
    if(!paused) animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    if(keys.up.pressed && lastKey === 'ArrowUp'){
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x: 0,
                    y: -Player.speed,
                }},
                rectangle: boundary,
            })){
                player.velocity.y = 0
                break
            }else{
                player.velocity.y = -Player.speed
            }
        }
    }else if(keys.left.pressed && lastKey === 'ArrowLeft'){
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x: -Player.speed,
                    y: 0,
                }},
                rectangle: boundary,
            })){
                player.velocity.x = 0
                break
            }else{
                player.velocity.x = -Player.speed
            }
        }
    }else if(keys.down.pressed && lastKey === 'ArrowDown'){
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x: 0,
                    y: Player.speed,
                }},
                rectangle: boundary,
            })){
                player.velocity.y = 0
                break
            }else{
                player.velocity.y = Player.speed
            }
        }
    }else if(keys.right.pressed && lastKey === 'ArrowRight'){
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(circleCollidesWithRectangle({
                circle: {...player, velocity: {
                    x: Player.speed,
                    y: 0,
                }},
                rectangle: boundary,
            })){
                player.velocity.x = 0
                break
            }else{
                player.velocity.x = Player.speed
            }
        }
    }

    for(let i = ghosts.length - 1; i >= 0; i--){
        const ghost = ghosts[i]
        if(Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y
        ) < ghost.radius + player.radius){            
            if(ghost.scared){
                ghosts.splice(i,1)
            }else{
                paused = true
                if(createQuestion() && lives >= 0){
                    lives--
                    ghosts.splice(i,1)
                    createGhost(ghost.color)
                    paused = false
                }else{
                    cancelAnimationFrame(animationId)
                    alert("You lose!!!")
                }
            }
        }
    }

    for(let i = powerUps.length - 1; i >= 0; i--){
        const powerUp = powerUps[i]
        powerUp.draw()
        if(Math.hypot(
            powerUp.position.x - player.position.x,
            powerUp.position.y - player.position.y
        ) < powerUp.radius + player.radius){
            powerUps.splice(i, 1)
            if(ghosts.length > 0 && createQuestion()){
                clearTimeout(scaredTimeout)
                ghosts.forEach(ghost => {
                    ghost.scared = true
                    scaredTimeout = setTimeout(() => {
                        ghost.scared = false
                    }, Ghost.scaredTime)
                })
            }
        }
    }

    for(let i = pellets.length - 1; i >= 0; i--){
        const pellet = pellets[i]
        pellet.draw()
        if(Math.hypot(
            pellet.position.x - player.position.x,
            pellet.position.y - player.position.y
        ) < pellet.radius + player.radius){
            pellets.splice(i, 1)
            score += 10
            scoreEl.innerHTML = score
        }
    }

    livesEl.forEach((lifeEl, i) => {
        if(i < lives) lifeEl.innerHTML = "&#10084"
        else lifeEl.innerHTML = ""
    })

    if(pellets.length === 0){
        boundaries = []
        ghosts = []
        player.position.x = Boundary.width * 5 + Boundary.width / 2,
        player.position.y = Boundary.height * 8 + Boundary.height / 2,
        createMap(1)
        switch (ghostCount){
            case 7:
                createGhost('Aqua',5,11)
            case 6:
                createGhost('Fuchsia',9,11)
            case 5:
                createGhost('Purple',1,11)
            case 4:
                createGhost('Orange',9,6)
            case 3:
                createGhost('Pink',1,6)
            case 2:
                createGhost('Teal',9,9)
            case 1:
                createGhost('Green',1,1)
            case 0:
                createGhost('Red',5,4)
                break
            default:
                increaseGhostSpeed()
                break
        }
        ghostCount++
        level++
        levelEl.innerHTML = level
    }
  
    boundaries.forEach(boundary => {
        boundary.draw()
        if(circleCollidesWithRectangle({
            circle: player,
            rectangle: boundary,
        })){
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })

    /*
    displays.forEach(display => {
        display.draw()
    })
    */

    player.update()

    ghosts.forEach(ghost => {
        ghost.update()
        const collisions = []
        boundaries.forEach(boundary => {
            if(!collisions.includes('right') &&
                circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x: Ghost.speed,
                    y: 0,
                }},
                rectangle: boundary,
            })){
                collisions.push('right')
            }
            if(!collisions.includes('left') &&
            circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x: -Ghost.speed,
                    y: 0,
                }},
                rectangle: boundary,
            })){
                collisions.push('left')
            }
            if(!collisions.includes('up') &&
            circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x: 0,
                    y: -Ghost.speed,
                }},
                rectangle: boundary,
            })){
                collisions.push('up')
            }
            if(!collisions.includes('down') &&
            circleCollidesWithRectangle({
                circle: {...ghost, velocity: {
                    x: 0,
                    y: Ghost.speed,
                }},
                rectangle: boundary,
            })){
                collisions.push('down')
            }
        })
        if(collisions.length > ghost.prevCollisions.length){
            ghost.prevCollisions = collisions
        }
        if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
            if(ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if(ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if(ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            else if(ghost.velocity.y > 0) ghost.prevCollisions.push('down')
            const pathways = ghost.prevCollisions.filter(collision => {
                return !collisions.includes(collision)
            })
            const direction = pathways[Math.floor(Math.random() * pathways.length)]
            switch (direction){
                case 'down':
                    ghost.velocity.x = 0
                    ghost.velocity.y = Ghost.speed
                    break
                case 'up':
                    ghost.velocity.x = 0
                    ghost.velocity.y = -Ghost.speed
                    break
                case 'left':
                    ghost.velocity.x = -Ghost.speed
                    ghost.velocity.y = 0
                    break
                case 'right':
                    ghost.velocity.x = Ghost.speed
                    ghost.velocity.y = 0
                    break
            }
            ghost.prevCollisions = []
        }
    })

    if(player.velocity.x > 0) player.rotation = 0
    else if(player.velocity.x < 0) player.rotation = Math.PI
    else if(player.velocity.y > 0) player.rotation = Math.PI / 2
    else if(player.velocity.y < 0) player.rotation = Math.PI * 1.5
}

displayBox(0)
createMap(0)
animate()

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
    }
})