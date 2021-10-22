import MovingDirection from "./MovingDirection.js";
export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y; 
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentDir = null;
        this.reqDir = null;     // requested direction

        document.addEventListener("keydown", this.#keydown);

        this.#loadPacmanImages();
    }

    draw(ctx){
        this.#move();
        ctx.drawImage(
            this.pacmanImages[this.pacmanImageIndex], 
            this.x, 
            this.y, 
            this.tileSize, 
            this.tileSize
            );
    }

    #move(){
        if(this.currentDir !== this.reqDir){
            if(Number.isInteger(this.x/this.tileSize) && Number.isInteger(this.y/this.tileSize)){
                // if it is an even position we are allowed
                this.currentDir = this.reqDir;
            }
        }
        switch(this.currentDir){
            case MovingDirection.up:
                this.y -= this.velocity;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                break;
            case MovingDirection.right:
                this.x += this.velocity;
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

        this.pacmanImageIndex = 2;
    }
    // this will always be applied to pacman
    #keydown = (event)=>{
        // up arrow
        if(event.keyCode == 38){
            // if we are already moving down, switch up
            if(this.currentDir == MovingDirection.down){
                this.currentDir = MovingDirection.up;
            }
            this.reqDir = MovingDirection.up;
        }
        // down arrow
        if(event.keyCode == 40){
            // if we are already moving up, switch to down
            if(this.currentDir == MovingDirection.up){
                this.currentDir = MovingDirection.down;
            }
            this.reqDir = MovingDirection.down;
        }
        // left arrow
        if(event.keyCode == 37){
            // if we are already moving right, switch to left
            if(this.currentDir == MovingDirection.right){
                this.currentDir = MovingDirection.left;
            }
            this.reqDir = MovingDirection.left;
        }
        // right arrow
        if(event.keyCode == 39){
            // if we are already moving left, switch to right
            if(this.currentDir == MovingDirection.left){
                this.currentDir = MovingDirection.right;
            }
            this.reqDir = MovingDirection.right;
        }
    }
}