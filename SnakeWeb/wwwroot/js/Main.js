import { Block } from './Model/Material.js';
import { Component } from './Model/Material.js';
import { Snake, Food } from './Model/Objects.js';
import { Screen } from './Model/DisplayScreen.js';
import * as DEngine from './Engine/Display/DisplayEngine.js';
import * as CEngine from './Engine/Caculate/CaculateEngine.js';
////import { DisplayEngine } from './Engine/Display/DisplayEngine.js'
//var headSnake1;
var excludeBlock = [];
var Snake1 = new Snake(excludeBlock);
excludeBlock.push(...Snake1.head.blockList);
excludeBlock.push(...Snake1.body.blockList);
var Food1 = new Food(excludeBlock);
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

startGame();
function startGame() {
    console.log("start game!!");
    //headSnake1 = new Component(blocks);
    //blockShowList.push(...headSnake1.blockList);
    myGameScreen1 = new Screen("screenGDiv");
    setInterval(updateGameScreen, rateDPS);
}

function updateGameScreen() {
    DEngine.clearScreen(myGameScreen1);
    excludeBlock = [];
    //feed
    CEngine.impactSnake(Snake1, [Food1]);
    excludeBlock.push(...Snake1.head.blockList);
    excludeBlock.push(...Snake1.body.blockList);
    excludeBlock.push(...Food1.elements.blockList);
    CEngine.createFood(Food1, 2, excludeBlock);
    //CEngine.impactHead(Snake1.head.blockList, Food1.elements.blockList);
    blockShowList = [];
    //CEngine.newHeadSnakePos(headSnake1);
    blockShowList.push(...Food1.elements.blockList);
    blockShowList.push(...Snake1.head.blockList);
    blockShowList.push(...Snake1.body.blockList);
    CEngine.moveBody(Snake1);
    CEngine.newHeadSnakePos(Snake1.head);
    DEngine.updateScreen(myGameScreen1, blockShowList);
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


