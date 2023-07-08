class Boundary {
    static width = 40
    static height = Boundary.width
    constructor({position, image}) {
        this.position = position
        this.width = Boundary.width
        this.height = Boundary.height
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Player {
    static speed = 4
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.radians = 0.75
        this.openrate = 0.12
        this.rotation = 0
    }
    draw(){
        c.save()
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y)
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            this.radians,
            Math.PI * 2 - this.radians
        )
        c.lineTo(this.position.x,this.position.y)
        c.fillStyle = 'Yellow'
        c.fill()
        c.closePath()
        c.restore()
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.radians < 0 || this.radians > 0.75){
            this.openrate = -this.openrate
        }
        this.radians += this.openrate
    }
}

class Ghost {
    static speed = 1
    static scaredTime = 5000
    constructor({position, velocity, color}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollisions = []
        this.speed = 1
        this.scared = false
    }
    draw(){
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        )
        c.fillStyle = this.scared ? 'Blue' : this.color
        c.fill()
        c.closePath()
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor({position}){
        this.position = position
        this.radius = 3
    }
    draw(){
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        )
        c.fillStyle = 'White'
        c.fill()
        c.closePath()
    }
}

class PowerUp {
    constructor({position}){
        this.position = position
        this.radius = 6
    }
    draw(){
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        )
        c.fillStyle = 'White'
        c.fill()
        c.closePath()
    }
}

class Display {
    constructor({show, size, text}) {
        this.show = show
        this.size = size
        this.text = text
    }

    update(){
        this.hide()
        if(this.show) displayEl.classList.add('show')
        if(this.text.h1) displayEl.querySelector('h1').innerHTML = this.text.h1
        if(this.text.p) displayEl.querySelector('p').innerHTML = this.text.p
    }

    question(){
        this.hide()
        if(this.show) questEl.classList.add('show')
        if(this.size) questEl.classList.add(this.size)
        if(this.text.h1) questEl.querySelector('h1').innerHTML = this.text.h1
        if(this.text.p) questEl.querySelectorAll('p')[0].innerHTML = this.text.p
        if(this.text.q) questEl.querySelectorAll('p')[1].innerHTML = this.text.q
    }

    notice(){
        this.hide()
        if(this.size) noticeEl.classList.add(this.size)
        noticeEl.classList.add('show')
    }

    hide(){
        displayEl.classList = ""
        questEl.classList = ""
        noticeEl.classList = ""
    }

}