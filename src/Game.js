import Pacman from './Pacman.js';
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
const gameOverSound = new Audio("audio/gameOver.wav");
const gameWinSound = new Audio("audio/gameWin.wav");


// similar to an update function in Java
function gameLoop(){
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
    checkGameOver();
    checkGameWin();
}

function checkGameWin(){
    if(!gameWin){
        gameWin = tileMap.didWin();
        if(gameWin){
            gameWinSound.play();
        }
    }
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
    return !pacman.madeFirstMove || gameOver || gameWin;
}


function drawGameEnd(){
    if(gameOver || gameWin){
        let text = '   You Win! ';
        if(gameOver){
            text = "  Game over!";
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height/3.2, canvas.clientWidth, 80);
        ctx.font = "80px comic sans";
        const gradient = ctx.createLinearGradient(0,0,canvas.clientWidth, 0);
        gradient.addColorStop('0', "gray");
        gradient.addColorStop("0.5", "lightgray");
        gradient.addColorStop("1.0", "white");

        ctx.fillStyle = gradient;
        ctx.fillText(text,10, canvas.height/2.3);
    }

}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);