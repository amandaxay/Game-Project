import TileMap from './Tilemap.js';

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);

// similar to an update function in Java
function gameLoop(){
    tileMap.draw(ctx);
    pacman.draw(ctx);
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);