import MovingDirection from "./MovingDirection.js";
var score = document.getElementById("score");
export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap){
        score.innerText--;
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentDir = null;
        this.reqDir = null;     // requested direction

        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;

        this.pacmanRotation = this.Rotation.right;
        this.wakaSound = new Audio("../audio/waka.wav");

        document.addEventListener("keydown", this.#keydown);

        this.#loadPacmanImages();
    }

    Rotation = {
        right:0,
        down:1,
        left:2,
        up:3,
    }

    draw(ctx){
        this.#move();
        this.#animate();
        this.#eatDot();
        // rotating pacman
        const size = this.tileSize/2;

        ctx.save();     // save this state to restore
        ctx.translate(this.x + size, this.y + size);    // flip the entire canvas
        ctx.rotate((this.pacmanRotation * 90 * Math.PI / 180)); // rotation math with our pacmanRotation values
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], -size, -size, this.tileSize, this.tileSize);    // use our pacman images for rotations
        ctx.restore();  // restore to original state


        // version without rotation
        // ctx.drawImage(
        //     this.pacmanImages[this.pacmanImageIndex], 
        //     this.x, 
        //     this.y, 
        //     this.tileSize, 
        //     this.tileSize
        //     );
    }

    #move(){
        if(this.currentDir !== this.reqDir){
            if(Number.isInteger(this.x/this.tileSize) && Number.isInteger(this.y/this.tileSize)){
                if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.reqDir))
                    // if it is an even position we are allowed
                    this.currentDir = this.reqDir;
            }
        }

        if(this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentDir)){
            // stop the animation if collided
            this.pacmanAnimationTimer = null;
            this.pacmanImageIndex = 1;
            return;
        } else if(this.currentDir != null && this.pacmanAnimationTimer == null){
            // if the we are first moving, set the animate
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        }

        switch(this.currentDir){
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;

            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break;

            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right;
                break;

        }
    }

    #loadPacmanImages(){
        const pacmanImage0 = new Image();
        pacmanImage0.src = "img/pac0.png";

        const pacmanImage1 = new Image();
        pacmanImage1.src = "img/pac1.png";

        const pacmanImage2 = new Image();
        pacmanImage2.src = "img/pac2.png";

        const pacmanImage3 = new Image();
        pacmanImage3.src = "img/pac1.png";

        this.pacmanImages = [
            pacmanImage0, 
            pacmanImage1, 
            pacmanImage2, 
            pacmanImage3
        ];

        this.pacmanImageIndex = 0;
    }
    // this will always be applied to pacman
    #keydown = (event)=>{
        // up arrow
        if(event.keyCode == 38 || event.keyCode == 87){
            // if we are already moving down, switch up
            if(this.currentDir == MovingDirection.down){
                this.currentDir = MovingDirection.up;
            }
            this.reqDir = MovingDirection.up;
        }
        // down arrow
        if(event.keyCode == 40 || event.keyCode == 83){
            // if we are already moving up, switch to down
            if(this.currentDir == MovingDirection.up){
                this.currentDir = MovingDirection.down;
            }
            this.reqDir = MovingDirection.down;
        }
        // left arrow
        if(event.keyCode == 37 || event.keyCode == 65){
            // if we are already moving right, switch to left
            if(this.currentDir == MovingDirection.right){
                this.currentDir = MovingDirection.left;
            }
            this.reqDir = MovingDirection.left;
        }
        // right arrow
        if(event.keyCode == 39 || event.keyCode == 68){
            // if we are already moving left, switch to right
            if(this.currentDir == MovingDirection.left){
                this.currentDir = MovingDirection.right;
            }
            this.reqDir = MovingDirection.right;
        }
    }

    #animate() {
        if(this.pacmanAnimationTimer == null){
            return;
        }
        this.pacmanAnimationTimer--;
        if(this.pacmanAnimationTimer == 0){
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
            this.pacmanImageIndex++;
            if(this.pacmanImageIndex == this.pacmanImages.length){
                this.pacmanImageIndex = 0;
            }
        }
    }

    #eatDot(){
        if(this.tileMap.eatDot(this.x, this.y)){
           // play sound 
           this.wakaSound.play();
           // increment score
           score.innerText++;
        }
    }
}