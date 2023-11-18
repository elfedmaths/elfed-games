class Boundary {
    constructor({position, dimension, sides}) {
        this.position = position
        this.width = dimension
        this.height = dimension
        this.shadow = dimension * 0.1
        this.sides = sides
    }
    draw(){
        c.fillStyle = '#00000042';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        // Draw the top this.shadow
        if(this.sides.includes("T")){
            c.fillStyle = '#a9a9a9';
            c.beginPath();
            c.moveTo(this.position.x, this.position.y);
            c.lineTo(this.position.x + this.width, this.position.y);
            if(this.sides.includes("R")){
                c.lineTo(this.position.x + this.width - this.shadow, this.position.y + this.shadow);
            }else{
                c.lineTo(this.position.x + this.width + this.shadow, this.position.y + this.shadow);
            }
            if(this.sides.includes("L")){
                c.lineTo(this.position.x + this.shadow, this.position.y + this.shadow);
            }else{
                c.lineTo(this.position.x - this.shadow, this.position.y + this.shadow);
            }
            c.closePath();
            c.fill();
        }
        // Draw the right this.shadow
        if(this.sides.includes("R")){
            c.fillStyle = '#7f7f7f';
            c.beginPath();
            c.moveTo(this.position.x + this.width, this.position.y);
            c.lineTo(this.position.x + this.width, this.position.y + this.height);
            if(this.sides.includes("B")){
                c.lineTo(this.position.x + this.width - this.shadow, this.position.y + this.height - this.shadow);
            }else{
                c.lineTo(this.position.x + this.width - this.shadow, this.position.y + this.height + this.shadow);
            }
            if(this.sides.includes("T")){
                c.lineTo(this.position.x + this.width - this.shadow, this.position.y + this.shadow);
            }else{
                c.lineTo(this.position.x + this.width - this.shadow, this.position.y - this.shadow);
            }
            c.closePath();
            c.fill();
        }
        // Draw the bottom this.shadow
        if(this.sides.includes("B")){
            c.fillStyle = '#7f7f7f';
            c.beginPath();
            c.moveTo(this.position.x, this.position.y + this.height);
            c.lineTo(this.position.x + this.width, this.position.y + this.height);
            if(this.sides.includes("R")){
                c.lineTo(this.position.x + this.width - this.shadow, this.position.y + this.height - this.shadow);
            }else{
                c.lineTo(this.position.x + this.width + this.shadow, this.position.y + this.height - this.shadow);
            }
            if(this.sides.includes("L")){
                c.lineTo(this.position.x + this.shadow, this.position.y + this.height - this.shadow);
            }else{
                c.lineTo(this.position.x - this.shadow, this.position.y + this.height - this.shadow);
            }
            c.closePath();
            c.fill();
        }
        // Draw the left this.shadow
        if(this.sides.includes("L")){
            c.fillStyle = '#a9a9a9';
            c.beginPath();
            c.moveTo(this.position.x, this.position.y);
            c.lineTo(this.position.x, this.position.y + this.height);
            if(this.sides.includes("B")){
                c.lineTo(this.position.x + this.shadow, this.position.y + this.height - this.shadow);
            }else{
                c.lineTo(this.position.x + this.shadow, this.position.y + this.height + this.shadow);
            }
            if(this.sides.includes("T")){
                c.lineTo(this.position.x + this.shadow, this.position.y + this.shadow);
            }else{
                c.lineTo(this.position.x + this.shadow, this.position.y - this.shadow);
            }
            c.closePath();
            c.fill();
        }
    }
}

class Player {
    static speed = 4
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = dimension * 0.3
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
        this.radius = dimension * 0.3
        this.color = color
        this.prevCollisions = []
        this.speed = 1
        this.scared = false
        this.hidden = false
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
        this.radius = dimension * 0.1
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
        c.fillStyle = 'Black'
        c.fill()
        c.closePath()
    }
}

class PowerUp {
    constructor({position}){
        this.position = position
        this.radius = dimension * 0.2
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
        c.fillStyle = 'Black'
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
        if(this.size.height) displayEl.style.height = this.size.height + "px"
            else displayEl.style.height = 13 * dimension + "px"
        if(this.size.width) displayEl.style.width = this.size.width + "px"
            else displayEl.style.width = 11 * dimension + "px"
        if(this.text.h1) displayEl.querySelector('h1').innerHTML = this.text.h1
        if(this.text.p) displayEl.querySelector('p').innerHTML = this.text.p
    }

    question(){
        this.hide()
        if(this.show) questEl.classList.add('show')
        if(this.size.height) questEl.style.height = this.size.height + "px"
            else questEl.style.height = 13 * dimension + "px"
        if(this.size.width) questEl.style.width = this.size.width + "px"
            else questEl.style.width = 11 * dimension + "px"
        if(this.text.h1) questEl.querySelector('h1').innerHTML = this.text.h1
        if(this.text.p) questEl.querySelectorAll('p')[0].innerHTML = this.text.p
        if(this.text.q) questEl.querySelectorAll('p')[1].innerHTML = this.text.q
    }

    notice(){
        this.hide()
        if(this.show) noticeEl.classList.add('show')
        if(this.size.height) noticeEl.style.height = this.size.height + "px"
            else noticeEl.style.height = 13 * dimension + "px"
        if(this.size.width) noticeEl.style.width = this.size.width + "px"
            else noticeEl.style.width = 9 * dimension + "px"
    }

    hide(){
        displayEl.classList = ""
        questEl.classList = ""
        noticeEl.classList = ""
    }

}