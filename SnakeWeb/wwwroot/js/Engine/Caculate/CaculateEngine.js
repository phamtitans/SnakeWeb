﻿
// caculate

import { Block } from "../../Model/Material.js";
import { Snake, Food, Obstackle } from "../../Model/Objects.js";

// control object

export function moveup(object, yUnit, rateUnit) {
    //object.accelerationY -= yUnit * rateUnit;
    object.speedY = -(yUnit * rateUnit);
}

export function movedown(object, yUnit, rateUnit) {
    //object.accelerationY += yUnit * rateUnit;
    object.speedY = (yUnit * rateUnit);
}

export function moveleft(object, xUnit, rateUnit) {
    //object.accelerationX -= xUnit * rateUnit;
    object.speedX = -(xUnit * rateUnit);
}

export function moveright(object,xUnit,rateUnit) {
    //object.accelerationX += xUnit * rateUnit;
    object.speedX = (xUnit * rateUnit);
}

export function stopMove(object) {
    object.speedX = 0;
    object.speedY = 0;
    //if (object.maxSpeedX != 0)
    //object.accelerationX = object.accelerationX * (-1);
    //object.maxSpeedX = 0;
}
export function breakMove(object, stopX = 0.1, stopY =0.1) {
    switch (object.direction) {
        case "UP":
            object.accelerationY += Math.abs(stopY);
            object.maxSpeedY = 0;
            break;
        case "DOWN":
            object.accelerationY -= Math.abs(stopY);
            object.minSpeedY = 0;
            break;
        case "RIGHT":
            object.accelerationX -= Math.abs(stopX);
            object.minSpeedX = 0;
            break;
        case "LEFT":
            object.accelerationX += Math.abs(stopX);
            object.maxSpeedX = 0;
            break;
        case "UP_RIGHT":
            object.accelerationY += Math.abs(stopY);
            object.maxSpeedY = 0;
            object.accelerationX -= Math.abs(stopX);
            object.minSpeedX = 0;
            break;
        case "UP_LEFT":
            object.accelerationY += Math.abs(stopY);
            object.maxSpeedY = 0;
            object.accelerationX += Math.abs(stopX);
            object.maxSpeedX = 0;
            break;
        case "DOWN_RIGHT":
            object.accelerationY -= Math.abs(stopY);
            object.minSpeedY = 0;
            object.accelerationX -= Math.abs(stopX);
            object.minSpeedX = 0;
            break;
        case "DOWN_LEFT":
            object.accelerationY -= Math.abs(stopY);
            object.minSpeedY = 0;
            object.accelerationX += Math.abs(stopX);
            object.maxSpeedX = 0;
            break;
        default:
            break;
    }
    //object.accelerationX = object.accelerationX*(-1);
    //object.accelerationY = object.accelerationY*(-1);
    //object.speedX = 0;
    //object.speedY = 0;

}
// new position
export function newHeadSnakePos(headSnake) {

    //changeSpeedObject(headSnake);
    //limitSpeedObject(headSnake);
    //console.log(headSnake.direction);
    headSnake.blockList.forEach(function (value, index) {
        //if (value.point.x <= 200) {
        //    console.log(value.point.x);
        //    console.log(value.point.y);
        //}
        //if (value.point.x <= (683 - headSnake.speedX) && value.point.x >= 0) {
        if (value.point.x <= 683 && value.point.x >= 0) {
            //value.point.x += headSnake.speedX;
        }
        else {
            var gamma = headSnake.speedX
            if (value.point.x < headSnake.speedX) {
                gamma = 0
            }

            value.point.x = Math.abs(value.point.x - 683);// + gamma;
            //value.point.x += headSnake.speedX;
        }
        value.point.x += headSnake.speedX;
        //if (value.point.y <= (341.5 - headSnake.speedY) && value.point.y >= 0) {
        if (value.point.y <= 341.5 && value.point.y >= 0) {

            //value.point.y += headSnake.speedY;
        }
        else {
            var delta = headSnake.speedY
            if (value.point.y < headSnake.speedY) {
                delta = 0
            }

            value.point.y = Math.abs(value.point.y - 341.5);// + delta;
            //value.point.y += headSnake.speedY;
        }
        value.point.y += headSnake.speedY;

        //console.log("x: " + value.point.x)
        //console.log("y: "+value.point.y)
    });
}
export function moveBody(snake) {
    var newBlocks = Block.CloneBlock(snake.head.blockList,0,0,"green");
    newBlocks.forEach(function (value) {
        if (snake.body.blockList.length > (newBlocks.length +1)) {
            snake.body.blockList.pop();
        }
        snake.body.blockList.unshift(value);
    });
}
export function newHeadSnakePosSpecial(headSnake) {

    if (headSnake.speedY >= 10) {
        //headSnake.accelerationY = -0.5;
        headSnake.accelerationY = -1;
    }
    if (headSnake.speedY <= -10) {
        //headSnake.accelerationY = 0.5;
        headSnake.accelerationY = 1;
    }
    headSnake.speedX += headSnake.accelerationX
    headSnake.speedY += headSnake.accelerationY;

    //console.log(headSnake.direction);
    headSnake.blockList.forEach(function (value, index) {
        if (value.point.x <= 200) {
            console.log(value.point.x);
            console.log(value.point.y);
        }
        value.point.x += headSnake.speedX;
        if (index % 2 == 0) {
            value.point.y += headSnake.speedY;
        }
        else {
            value.point.y += (-headSnake.speedY);
        }
    });
}

export function changeSpeedObject(object) {

    object.speedX += object.accelerationX;
    object.speedY += object.accelerationY;
}
export function limitSpeedObject(object) {

    if (object.maxSpeedX != null && object.maxSpeedX < object.speedX) {
        object.accelerationX = 0;
        object.speedX = object.maxSpeedX;
    }
    if (object.maxSpeedY != null && object.maxSpeedY < object.speedY) {
        object.accelerationY = 0;
        object.speedY = object.maxSpeedY;
    }
    if (object.minSpeedX != null && object.minSpeedX > object.speedX) {
        object.accelerationX = 0;
        object.speedX = object.minSpeedX;
    }
    if (object.minSpeedY != null && object.minSpeedY > object.speedY) {
        object.accelerationY = 0;
        object.speedY = object.minSpeedY;
    }

}

export function createFood(food,foodNumMax,excludeBlock=[],area = []) {

    while (food.elements.blockList.length <= foodNumMax) {
        var newFoodBlock = Block.RandomPointBlock(food.color, food.height, food.width, food.weight, excludeBlock, area[0] - food.width, area[1] - food.height);
        food.elements.blockList.push(newFoodBlock);
    }
}
export function impactSnake(player,objects) {
    //var excludeBlock = [];
    var foodImpact = false;
    var obstackleImpact = false;
    objects.forEach(function (value) {
        //feed
        if (value instanceof Food) {
            var blockResult = impactHead(player.Snake.head.blockList, value.elements.blockList);
            if (blockResult != null && blockResult.length > 0) {
                var newBlocks = Block.CloneBlock(player.Snake.head.blockList, 0, 0, "green");
                newBlocks.forEach(function (value) {
                    //if (snake.body.blockList.length > (newBlocks.length + 1)) {
                    //    snake.body.blockList.pop();
                    //}
                    player.Snake.body.blockList.unshift(value);
                });
                newHeadSnakePos(player.Snake.head);
                //add +1 score
                player.Score.value += 1;
                //console.log(player.Score.value);
                var ind = value.elements.blockList.findIndex(function (block) {
                    return block.point.x == blockResult[0].point.x && block.point.y == blockResult[0].point.y;
                });
                //console.log(ind);
                //delete value.elements.blockList[ind];
                value.elements.blockList.splice(ind, 1);
                foodImpact = true;
                //console.log(value.elements.blockList);
            }
        }
        //crash
        if (value instanceof Obstackle) {
            var blockResult = impactHead(player.Snake.head.blockList, value.Component.blockList);
            if (blockResult != null && blockResult.length > 0) {
                
                //add +1 score
                player.GameOver = true;

                obstackleImpact = true;
                //console.log(player.Score.value);
            }
        }
    });
    return [foodImpact, obstackleImpact]
}
export function impactHead(headBlockList, blockList) {
    var rsBlocks = [];
    headBlockList.forEach(function (value) {
        var headBlock = value;
        blockList.forEach(function (value) {
            if (impactBlock(headBlock, value)) {
                rsBlocks = [value, headBlock];
            };
        });
    });
    return rsBlocks;
}
export function impactBlock(block1, block2) {
    if (
        (Math.abs(block1.point.x - block2.point.x) < Math.abs(block1.width) &&
        Math.abs(block1.point.y - block2.point.y) < Math.abs(block1.height)) ||
        (Math.abs(block1.point.x - block2.point.x) < Math.abs(block2.width) &&
        Math.abs(block1.point.y - block2.point.y) < Math.abs(block2.height))
        ) {
        return true;
    }
    else {
        return false;
    }
}


