import { Block } from './Material.js';
import { Component } from './Material.js';
import { Screen } from './DisplayEngine.js';
////import { DisplayEngine } from './Engine/Display/DisplayEngine.js'
var x = 0;
var y = 0;
var height = 10;
var width = 20;
var color = "";
var weight = 1;
//var block = new Block(x, y, color, height, width, weight);
//var blocks = [block];
//var snake = new Component(blocks);
//console.log(snake.direction);

var myGamePiece;
var myGameArea;
function startGame() {
    console.log("alooo");
    //myGamePiece = new component(xUnit, yUnit, "red", 10, 120);
    var block = new Block(x, y, color, height, width, weight);
    var blocks = [block];

    myGamePiece = new Component(blocks);
    console.log(myGamePiece.direction);

    myGameArea = new Screen("screenGDiv", 20, 10, 10);
    myGameArea.start();
}
function update() {
            var ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
}
function newpos(component) {
    component.blockList.forEach(function (value) {
        value.point.x += value.speedX;
        value.point.y += value.speedY;
    });
    //component..x += this.speedX;
    //        this.y += this.speedY;
}

//class component {
//    constructor(width, height, color, x, y) {
//        this.width = width;
//        this.height = height;
//        this.speedX = 1;
//        this.speedY = 0;
//        this.x = x;
//        this.y = y;
//        //this.context = context;
//        this.update = function () {
//            var ctx = myGameArea.context;
//            ctx.fillStyle = color;
//            ctx.fillRect(this.x, this.y, this.width, this.height);
//        }
//        this.newPos = function () {
//            this.x += this.speedX;
//            this.y += this.speedY;
//        }
//    }
//}


//function updateGameArea() {
//    myGameArea.clear();
//    //savePos();
//    myGamePiece.newPos();
//    myGamePiece.update();
//    //showListPos();
//}
startGame();
