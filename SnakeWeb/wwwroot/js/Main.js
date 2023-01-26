import { Block } from './Model/Material.js';
import { Component } from './Model/Material.js';
import { Screen } from './Model/DisplayScreen.js';
import * as DEngine from './Engine/Display/DisplayEngine.js';
import * as CEngine from './Engine/Caculate/CaculateEngine.js';
////import { DisplayEngine } from './Engine/Display/DisplayEngine.js'
var headSnake1;
var myGameScreen1;
var x = 0;
var y = 100;
var height = 10;
var width = 10;
var color = "red";
var weight = 1;
var block = new Block(x, y, color, height, width, weight);
var block2 = new Block(x, y+20, color, height, width, weight);
var blocks = [block, block2];
var blockShowList = [];
var rateDPS = 20;
var xUnit = 10;
var yUnit = 10;
var rateUnit = 0.175;

startGame();
function startGame() {
    console.log("start game!!");
    headSnake1 = new Component(blocks);
    blockShowList.push(...headSnake1.blockList);
    myGameScreen1 = new Screen("screenGDiv");
    setInterval(updateGameScreen, rateDPS);
}

function updateGameScreen() {
    DEngine.clearScreen(myGameScreen1);
    CEngine.newHeadSnakePos(headSnake1);
    DEngine.updateScreen(myGameScreen1, blockShowList);
}

//control object

document.addEventListener("keydown", key => {
    switch (key.keyCode) {
        case 37:
            if (headSnake1.direction == "RIGHT") break;
            CEngine.stopMove(headSnake1);
            CEngine.moveleft(headSnake1, xUnit, rateUnit);
            break;
        case 38:
            if (headSnake1.direction == "DOWN") break;
            CEngine.stopMove(headSnake1);
            CEngine.moveup(headSnake1, yUnit, rateUnit);
            break;
        case 39:
            if (headSnake1.direction == "LEFT") break;
            CEngine.stopMove(headSnake1);
            CEngine.moveright(headSnake1, xUnit, rateUnit);
            break;
        case 40:
            if (headSnake1.direction == "UP") break;
            CEngine.stopMove(headSnake1);
            CEngine.movedown(headSnake1, yUnit, rateUnit);
            break;
    }
});


