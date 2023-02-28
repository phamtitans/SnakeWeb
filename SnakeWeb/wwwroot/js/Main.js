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
//var Snake1;
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
var otherNamePlayerListData = [];
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
        if (confirm("Play again?")) {
            removePlayer(player1);
            document.location = window.location.href;
        }
    }
    else {
        //
        DEngine.clearScreen(myGameScreen1);
        excludeBlock = [];
        excludeBlock.push(...Obstackle1.Component.blockList);
        //feed
        var rsImpact = CEngine.impactSnake(player1, [Food1, Obstackle1]);
        if (rsImpact[0]) {
            updateFoodToOther(Food1);
        }
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

            otherPlayerListData.forEach(function (value) {
                blockShowList.push(...value.Snake.head.blockList);
                blockShowList.push(...value.Snake.body.blockList);
            });
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

function removePlayer(player) {
    var user = player.Name;
    connection.invoke("RemovePlayer", user).catch(function (err) {
        return console.error(err.toString());
    });
}

connection.on("ReceiveRemovePlayer", function (user) {
    if (otherNamePlayerListData.includes(user)) {
        var playerIndex = otherPlayerListData.findIndex(function (value) {
            return value.Name == user;
        });
        otherPlayerListData.splice(playerIndex, 1);
    }
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
function updateFoodToOther(food) {
    var data = JSON.stringify(food);
    connection.invoke("UpdateFood", data).catch(function (err) {
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

connection.on("ReceiveCheckExistedHostResult", function (hostExistedRs, foodDataStringRs, obstackleDataStringRs) {
    var stringRs = JSON.stringify(hostExistedRs);
    hostExisted = (stringRs?.toLowerCase?.() === 'true');
    if (hostExisted) {
        excludeBlock = [];

        var food = JSON.parse(foodDataStringRs);
        Food1.elements.blockList = food.elements.blockList;
        excludeBlock.push(...Food1.elements.blockList);

        var obstackle = JSON.parse(obstackleDataStringRs);
        Obstackle1.Component.blockList = obstackle.Component.blockList;
        excludeBlock.push(...Obstackle1.Component.blockList);

        //Snake1 = new Snake(excludeBlock);
        //excludeBlock.push(...Snake1.head.blockList);
        //excludeBlock.push(...Snake1.body.blockList);

    }
});

connection.on("ReceiveUpdateFoodResult", function (foodDataString) {
    var food = JSON.parse(foodDataString);
    //updateFood = true;
    Food1.elements.blockList = food.elements.blockList;
});

connection.on("ReceiveData", function (message) {

    var player = JSON.parse(message);
    var name = player.Name;
    if (otherNamePlayerListData.includes(name)) {
        var playerTarget = otherPlayerListData.find(function (value) {
            return value.Name == name;
        });
        playerTarget.Snake.head.blockList = player.Snake.head.blockList;
        playerTarget.Snake.body.blockList = player.Snake.body.blockList;
    }
    else {
        otherNamePlayerListData.push(name);
        otherPlayerListData.push(player);
    }

    //console.log(message);

    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    //li.textContent = `${user} says ${message}`;
});
