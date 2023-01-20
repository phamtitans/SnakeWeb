import { Block } from './Model/Material.js';
import { Component } from './Model/Material.js';
import { Screen } from './Model/DisplayScreen.js';
////import { DisplayEngine } from './Engine/Display/DisplayEngine.js'
var headSnake1;
var myGameScreen1;
var x = 0;
var y = 0;
var height = 10;
var width = 10;
var color = "red";
var weight = 1;
var block = new Block(x, y, color, height, width, weight);
var block2 = new Block(x, y+20, color, height, width, weight);
var blocks = [block, block2];
var blockShowList = [];
var rateDPS = 100;

startGame();
function startGame() {
    console.log("start game!!");
    headSnake1 = new Component(blocks);
    headSnake1.accelerationX = 0.015;
    blockShowList.push(...headSnake1.blockList);
    //console.log(headSnake1.blockList[0].point.x);
    //console.log(headSnake1.blockList[1].point.x);
    //myGamePiece = new component(xUnit, yUnit, "red", 10, 120);
    myGameScreen1 = new Screen("screenGDiv");
    //myGameArea.start();
    setInterval(updateGameScreen, rateDPS);
}

function updateGameScreen() {
    clearScreen(myGameScreen1);
    newHeadSnakePos(headSnake1);
    updateScreen(myGameScreen1, blockShowList);
}

//display
function clearScreen (screen) {
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    screen.context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);

}
function updateScreen(myGameScreen,showList) {
    var ctx = myGameScreen.context;
    showList.forEach(function (value) {
        ctx.fillStyle = value.color;
        ctx.fillRect(value.point.x, value.point.y, value.width, value.height);
    });
}

// caculate
function newHeadSnakePos(headSnake) {
    headSnake.blockList.forEach(function (value) {
        if (value.point.x <=200) {
            console.log(value.point.x);
            console.log(value.point.x);
        }
        value.point.x += (headSnake.speedX += headSnake.accelerationX);
        value.point.y += (headSnake.speedY += headSnake.accelerationY);
    });
}



