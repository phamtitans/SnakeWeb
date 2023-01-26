
// caculate

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
        value.point.x += headSnake.speedX;
        value.point.y += headSnake.speedY;
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

    console.log(headSnake.direction);
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



