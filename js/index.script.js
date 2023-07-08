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
                score += 50
                scoreEl.innerHTML = score
                if(level > 4){
                    let ghostDir = playerDirection()
                    let xpos = 5, ypos = 6;
                    xpos = Math.floor((canvas.width - ghost.position.x) / 40)
                    ypos = Math.floor((canvas.height - ghost.position.y) / 40)
                    setTimeout(() => {
                        createGhost(ghost.color,xpos,ypos,ghostDir)
                    }, 3000)
                }
            }else{
                paused = true
                index = i
                if(lives > 0) displayQuestion('ghost')
                else if(lives === 0) endGame()
                else paused = false
            }
        }
    }

    for(let i = powerUps.length - 1; i >= 0; i--){
        const powerUp = powerUps[i]
        powerUp.draw()
        if(Math.hypot(
            powerUp.position.x - player.position.x,
            powerUp.position.y - player.position.y
            ) <= powerUp.radius + player.radius){
            powerUps.splice(i, 1)
            paused = true
            if(ghosts.length > 0) displayQuestion('powerup')
            else paused = false
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
        level++
        resetPlayer()
        resetLevel(level)
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

    levelEl.innerHTML = level

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

resetLevel(level)
animate()