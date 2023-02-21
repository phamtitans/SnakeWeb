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

var blockShowList = [];
var rateDPS = 20;
var xUnit = 10;
var yUnit = 10;
var rateUnit = 0.25;
var interval;
"use strict";
//var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var connection = new signalR.HubConnectionBuilder().withUrl("/dataHub").build();

//Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

var connectionFlag = false;
var hostExisted = false;
var updateObstakle = false;
var updateFood = false;

connection.start().then(function () {
    //document.getElementById("sendButton").disabled = false;
    connectionFlag = true;
    checkExistedHost(Obstackle1, Food1);
}).catch(function (err) {
    return console.error(err.toString());
});

var otherPlayerListData = [];
var foodData;
var obstackleData;

startGame();
function startGame() {
    console.log("start game!!");
    interval = setInterval(updateGameScreen, rateDPS);
}

function updateGameScreen() {
    if (player1.GameOver) {
        clearInterval(interval);
        alert("Game Over");
        if (confirm("Play again?")) document.location = window.location.href;
    }
    else {
        //
        if (connectionFlag == true && hostExisted == true) {
            if (updateObstakle == true) {
                Obstackle1 = obstackleData;
                updateObstakle = false;
            }
            if (updateFood == true) {
                Food1 = foodData;
                updateFood = false;
            }
        } 
        //
        DEngine.clearScreen(myGameScreen1);
        excludeBlock = [];
        excludeBlock.push(...Obstackle1.Component.blockList);
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

        if (connectionFlag == true) {
            if (hostExisted == true) {
                sendDataToServer(player1);
            }
            //else {
            //    sendDataToServer(blockShowList);
            //}
        }

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


connection.on("ReceiveData", function (message) {

    var x = JSON.parse(message);
    console.log(message);

    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    //li.textContent = `${user} says ${message}`;
});

function sendDataToServer(player) {
    //var user = document.getElementById("userInput").value;
    //var user = "phuongdeptrai";
    var user = player.Name;
    var data = JSON.stringify(player);
    connection.invoke("SendData", user, data).catch(function (err) {
        return console.error(err.toString());
    });
}

function checkExistedHost(obstackle, food) {
    var foodDataString = JSON.stringify(food);
    var obstackleDataString = JSON.stringify(obstackle);
    connection.invoke("CheckExistedHost", foodDataString, obstackleDataString).catch(function (err) {
        return console.error(err.toString());
    });
}

connection.on("ReceiveCheckExistedHostResult", function (hostExistedRs) {
    var stringRs = JSON.stringify(hostExistedRs);
    hostExisted = (stringRs?.toLowerCase?.() ==='true');
    //updateObstakle = (updateObstakleRs?.toLowerCase?.() ==='true');
    //updateFood = (updateFoodRs?.toLowerCase?.() === 'true');
    //if (hostExisted == true) {

    //}
    //var x = JSON.parse(message);
    console.log(hostExisted);
    console.log(updateObstakle);
    console.log(updateFood);

    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    //li.textContent = `${user} says ${message}`;
});
