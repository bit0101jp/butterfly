//
// Ref. https://github.com/generative-light/p5.scribble.js/blob/master/examples/phantomjs/page.html
//

sizex = 50
sizey = 50

firstSpeed = 10

gravity = 9.8

let paletteNo = 0
let palette = ["#E63F39",
                "#C4A0CC",
                "#F4B6C3",
                "#F8E823",
                "#ABD8C9",
                "#725AB6",
                "#3A9593",
                "#7ADEB6",
                "#F281B8" ]

let butterfly = new Array()

function draw() {
    if (butterfly.length < 200){
        posx = random(windowWidth / 2 - 150, windowWidth / 2 + 150)
        posy = random(400, 800)
        deg = random(5, 175)
        butterfly.push(new Butterfly(posx, posy, sizex, sizey, firstSpeed, radians(deg), gravity, palette[paletteNo]))
        if (paletteNo < palette.length - 1)
            paletteNo++
        else
            paletteNo = 0
    }

    createCanvas(windowWidth, windowHeight)
    background( 255 )

    var scribble = new Scribble()

    for (i = 0; i < butterfly.length; i++){
        butterfly[i].speedUpdate(frameCount)
        butterfly[i].posUpdate()
        butterfly[i].draw(scribble)
    }
}

class Butterfly {
    constructor( posx, posy, sizex, sizey, firstSpeed, ang, gravity, color) {
        this.posx = posx
        this.posy = posy
        this.sizex = sizex
        this.sizey = sizey
        this.firstSpeed = firstSpeed
        this.ang = ang
        this.color = color
        this.gravity = gravity
        this.speedx = firstSpeed * cos(ang)
        this.speedy = firstSpeed * sin(ang)
        this.drawflg = true
    }
 
    setPos(posx, posy) {
        this.posx = posx
        this.posy = posy            
        return
    }

    posUpdate(){
        if (posy > windowHeight - sizey / 2){
            this.speedy = this.firstSpeed * sin(this.ang)
        }
        if (this.speedy < 1){
            this.drawflg = false
        }
        this.posx = this.posx + this.speedx
        this.posy = this.posy - this.speedy
        return
    }

    getPos() {
        return {x: this.posx, y: this.posy}
    }

    setSpeed(speedx, speedy) {
        this.speedx = speedx
        this.speedy = speedy
        return
    }

    getSpeed() {
        return {x: this.speedx, y: this.speedy}
    }

    speedUpdate(frameCount){
        this.speedy = this.speedy - this.gravity * frameCount / 7000
        return
    }

    speedReset(){
        if (this.posy > windowHeight){
            this.speedy = this.firstSpeed * sin(this.ang)
        }
        return
    }

    getSize() {
        return {x: this.sizex, y: this.sizey}
    }

    setColor(rgb){
        this.color = rgb
        return
    }

    draw(scribble) {
        if (this.drawflg == true){        
            stroke(this.color)
            strokeWeight(6)
            scribble.roughness = 10
            scribble.scribbleEllipse( this.posx, this.posy, this.sizex, this.sizey)
        }
    return
    }
}
