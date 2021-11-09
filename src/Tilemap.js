import Pacman from "./Pacman.js";
import MovingDirection from "./MovingDirection.js";
export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;
        
        this.yellowDot = new Image()
        this.yellowDot.src = 'img/yellowDot.png';
        
        this.wall = new Image()
        this.wall.src = 'img/wall.png'
    }

    // 1 - wall
    // 0 - path
    // 4 - pac Man
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    draw(ctx) {
        for(let row = 0; row < this.map.length; row++){
            for(let col = 0; col < this.map[row].length; col++){
                let tile = this.map[row][col];
                if(tile == 1){
                    this.#drawWall(ctx, col, row, this.tileSize);   // # indicates private methods
                }
                else if (tile == 0){
                    this.#drawDot(ctx, col, row, this.tileSize);
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

    #drawDot(ctx, col, row, size){
        ctx.drawImage(
            this.yellowDot,
            col*this.tileSize, 
            row*this.tileSize, 
            size, 
            size
        );
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
}