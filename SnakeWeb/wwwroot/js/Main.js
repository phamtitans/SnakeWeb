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

startGame();
function startGame() {
    console.log("start game!!");
    headSnake1 = new Component(blocks);
    headSnake1.accelerationX = 0.015;
    headSnake1.accelerationY = 5;
    blockShowList.push(...headSnake1.blockList);
    myGameScreen1 = new Screen("screenGDiv");
    setInterval(updateGameScreen, rateDPS);
}

function updateGameScreen() {
    DEngine.clearScreen(myGameScreen1);
    CEngine.newHeadSnakePos(headSnake1);
    DEngine.updateScreen(myGameScreen1, blockShowList);
}

