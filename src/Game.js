import TileMap from './Tilemap.js';

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("../audio/gameOver.wav");
const gameWinSound = new Audio("../audio/gameWin.wav");


// similar to an update function in Java
function gameLoop(){
    tileMap.draw(ctx);
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
    checkGameOver();
}

function checkGameOver(){
    if(!gameOver){
        gameOver = isGameOver();
        if(gameOver){
            gameOverSound.play();
        }
    }
}

function isGameOver(){
    // check if we are colliding with enemy
    return enemies.some(
        (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman
    ));
}

function pause(){
    return !pacman.madeFirstMove || gameOver;
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);