import Pacman from "./Pacman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;
        
        this.yellowDot = new Image()
        this.yellowDot.src = "img/yellowDot.png";

        this.pinkDot = new Image();
        this.pinkDot.src = "img/pinkDot.png";
        
        this.wall = new Image()
        this.wall.src = "img/wall.png";

        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    }

    // 0 - dots
    // 1 - wall
    // 2 - power dot
    // 4 - pac Man
    // 5 - empty space
    // 6 - enemy
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 6, 1, 0, 0, 2, 1, 0, 1, 2, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 6, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 2, 0, 0, 1, 0, 0, 6, 0, 0, 1, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    draw(ctx) {
        for(let row = 0; row < this.map.length; row++){
            for(let col = 0; col < this.map[row].length; col++){
                let tile = this.map[row][col];
                if(tile === 1){
                    this.#drawWall(ctx, col, row, this.tileSize);   // # indicates private methods
                }
                else if (tile === 0){
                    this.#drawDot(ctx, col, row, this.tileSize);
                } else if (tile === 2){
                    this.#drawPowerDot(ctx, col, row, this.tileSize);
                }


                else {
                    this.#drawBlank(ctx, col, row, this.tileSize);
                }


                // ctx.strokeStyle = "yellow";
                // ctx.strokeRect(
                //     col * this.tileSize, 
                //     row * this.tileSize, 
                //     this.tileSize, 
                //     this.tileSize
                // );
            }
        }
    }

    #drawWall(ctx, col, row, size){
        ctx.drawImage(
            this.wall,
            col*this.tileSize, 
            row*this.tileSize, 
            size, 
            size
        );
    }

    #drawPowerDot(ctx, col, row, size){
        this.powerDotAnimationTimer--;
        if(this.powerDotAnimationTimer == 0){
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            if(this.powerDot == this.pinkDot){
                this.powerDot = this.yellowDot;
            } else {
                this.powerDot = this.pinkDot;
            }
        }
        ctx.drawImage(this.powerDot, col * size, row * size, size, size);
    }

    #drawDot(ctx, col, row, size){
        ctx.drawImage(
            this.yellowDot,
            col*this.tileSize, 
            row*this.tileSize, 
            size, 
            size
        );
    }

    #drawBlank(ctx, col, row, size){
        ctx.fillStyle = 'black';
        ctx.fillRect(col * this.tileSize, row * this.tileSize, size, size)
    }

    getEnemies(velocity){
        const enemies = [];

        for(let row = 0; row < this.map.length; row++){
            for(let col = 0; col < this.map[row].length; col++){
                const tile = this.map[row][col];
                if(tile === 6){
                    this.map[row][col] = 0;
                    enemies.push(
                        new Enemy(
                            col * this.tileSize, 
                            row * this.tileSize, 
                            this.tileSize, 
                            velocity, 
                            this
                        )
                    );
                }
            }
        }
        return enemies;
    }

    getPacman(velocity){
        for(let row = 0; row < this.map.length; row++){
            for(let col = 0; col < this.map[row].length; col++){
                let tile = this.map[row][col];
                if(tile == 4){
                    this.map[row][col] = 0;
                    return new Pacman(
                        col * this.tileSize, 
                        row * this.tileSize, 
                        this.tileSize, 
                        velocity, 
                        this
                        );
                }
            }
        }
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didWin(){
        return this.#dotsLeft() === 0;
    }

    #dotsLeft(){
        // flat transforms our 2d array into 1d
        // filters how many 0 dots are left
        return this.map.flat().filter(tile => tile === 0).length;
    }

    didCollideWithEnvironment(x,y,direction){
        if(direction == null){
            return;
        }

        if(Number.isInteger(x/this.tileSize) && Number.isInteger(y/this.tileSize)){
            let col = 0;
            let row = 0;
            let nextCol = 0;
            let nextRow = 0;

            switch(direction){
                case MovingDirection.right:
                    nextCol = x + this.tileSize;
                    col = nextCol / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.left:
                    nextCol = x - this.tileSize;
                    col = nextCol / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    col = x / this.tileSize;
                    break;
                
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    col = x / this.tileSize;
                    break;
            }
            const tile = this.map[row][col];
            if(tile === 1){
                return true;
            }
        }
        return false;
    }

    eatDot(x, y){
        const row = y / this.tileSize;
        const col = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(col)){
            if(this.map[row][col] === 0){
                // is a dot, eat dot
                this.map[row][col] = 5;
                return true;
            }
        }
        return false;
    }

    eatPowerDot(x,y){
        const row = y/this.tileSize;
        const col = x/this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(col)){
            const tile = this.map[row][col];
            if(tile === 2){
                this.map[row][col] = 5;
                return true;
            }
        }
        return false;
    }
}