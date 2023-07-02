const mainContainer = document.querySelector('#main')
const scoreEl = document.querySelector('#score-elem')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 440
canvas.height = 520

const pellets = []
const powerUps = []
const boundaries = []
const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 5 + Boundary.width / 2,
            y: Boundary.height * 1 + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        }
    }),
    new Ghost({
        position: {
            x: Boundary.width * 5 + Boundary.width / 2,
            y: Boundary.height * 8 + Boundary.height / 2,
        },
        velocity: {
            x: Ghost.speed,
            y: 0,
        },
        colour: 'green'
    })
]

const player= new Player({
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
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''
let score = 0

function createImage(src){
    const image = new Image()
    image.src = `./img/${src}.png`
    image.width = Boundary.width
    image.height = Boundary.height
    return image
}

function circleCollidesWithRectangle({circle, rectangle}){
    const padding = Boundary.width/2 - circle.radius - 1
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding && 
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding && 
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding && 
            circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)
}

let animationId

function animate(){
    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    if(keys.w.pressed && lastKey === 'w'){
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
    }else if(keys.a.pressed && lastKey === 'a'){
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
    }else if(keys.s.pressed && lastKey === 's'){
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
    }else if(keys.d.pressed && lastKey === 'd'){
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
                cancelAnimationFrame(animationId)
                console.log("You Lose!!")
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
            ghosts.forEach(ghost => {
                ghost.scared = true
                setTimeout(() => {
                    ghost.scared = false
                }, Ghost.scaredTime)
            })
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

    if(pellets.length === 0){
        cancelAnimationFrame(animationId)
        console.log("You Win!!")
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

createMap()
animate()

addEventListener('keydown', ({key}) => {
    switch(key){
        case 'w':
            keys.w.pressed = true
            lastKey ='w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey ='a'
            break
        case 's':
            keys.s.pressed = true
            lastKey ='s'
            break
        case 'd':
            keys.d.pressed = true
            lastKey ='d'
            break
    }
})

addEventListener('keyup', ({key}) => {
    switch(key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})