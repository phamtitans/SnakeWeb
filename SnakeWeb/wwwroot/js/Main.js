import { Block } from './Model/Material.js';
import { Component } from './Model/Material.js';
import { Snake, Food, Player, Obstackle } from './Model/Objects.js';
import { Screen } from './Model/DisplayScreen.js';
import * as DEngine from './Engine/Display/DisplayEngine.js';
import * as CEngine from './Engine/Caculate/CaculateEngine.js';
////import { DisplayEngine } from './Engine/Display/DisplayEngine.js'
//var headSnake1;

myGameScreen1 = new Screen("screenGDiv");
var excludeBlock = [];
var Obstackle1 = new Obstackle([myGameScreen1.canvas.width, myGameScreen1.canvas.height]);
excludeBlock.push(...Obstackle1.Component.blockList);
var Snake1 = new Snake(excludeBlock);
excludeBlock.push(...Snake1.head.blockList);
excludeBlock.push(...Snake1.body.blockList);
var player1 = new Player(Snake1);
var Food1 = new Food(excludeBlock, [myGameScreen1.canvas.width, myGameScreen1.canvas.height]);
excludeBlock.push(...Food1.elements.blockList);
var myGameScreen1;
var x = 0;
var y = 100;
var height = 10;
var width = 10;
var color = "red";
var weight = 1;
//var block = new Block(x, y, color, height, width, weight);
//var block2 = new Block(x, y+20, color, height, width, weight);
//var blocks = [block, block2];
var blockShowList = [];
var rateDPS = 20;
var xUnit = 10;
var yUnit = 10;
var rateUnit = 0.25;
var interval;
startGame();
function startGame() {
    console.log("start game!!");
    //headSnake1 = new Component(blocks);
    //blockShowList.push(...headSnake1.blockList);
    //myGameScreen1 = new Screen("screenGDiv");
    interval = setInterval(updateGameScreen, rateDPS);
}

function updateGameScreen() {
    if (player1.GameOver) {
        clearInterval(interval);
        alert("Game Over");
        if (confirm("Play again?")) document.location = window.location.href;
    }
    else {

        DEngine.clearScreen(myGameScreen1);
        excludeBlock = [];
        //feed
        CEngine.impactSnake(player1, [Food1, Obstackle1]);
        excludeBlock.push(...Snake1.head.blockList);
        excludeBlock.push(...Snake1.body.blockList);
        excludeBlock.push(...Food1.elements.blockList);
        CEngine.createFood(Food1, 2, excludeBlock, [myGameScreen1.canvas.width, myGameScreen1.canvas.height]);
        //CEngine.impactHead(Snake1.head.blockList, Food1.elements.blockList);
        blockShowList = [];
        //CEngine.newHeadSnakePos(headSnake1);
        blockShowList.push(...Obstackle1.Component.blockList);
        blockShowList.push(...Food1.elements.blockList);
        blockShowList.push(...Snake1.head.blockList);
        blockShowList.push(...Snake1.body.blockList);
        CEngine.moveBody(Snake1);
        CEngine.newHeadSnakePos(Snake1.head);
        DEngine.updateScreen(myGameScreen1, blockShowList);
        DEngine.updatePlayerScreen(myGameScreen1, player1);
    }
}

//control object

document.addEventListener("keydown", key => {
    switch (key.keyCode) {
        case 37:
            if (Snake1.head.direction == "RIGHT") break;
            CEngine.stopMove(Snake1.head);
            CEngine.moveleft(Snake1.head, xUnit, rateUnit);
            break;
        case 38:
            if (Snake1.head.direction == "DOWN") break;
            CEngine.stopMove(Snake1.head);
            CEngine.moveup(Snake1.head, yUnit, rateUnit);
            break;
        case 39:
            if (Snake1.head.direction == "LEFT") break;
            CEngine.stopMove(Snake1.head);
            CEngine.moveright(Snake1.head, xUnit, rateUnit);
            break;
        case 40:
            if (Snake1.head.direction == "UP") break;
            CEngine.stopMove(Snake1.head);
            CEngine.movedown(Snake1.head, yUnit, rateUnit);
            break;
    }
});


