
// caculate

// control object

export function moveup(object, yUnit, rateUnit) {
    object.accelerationY -= yUnit * rateUnit;
}

export function movedown(object, yUnit, rateUnit) {
    object.accelerationY += yUnit * rateUnit;
}

export function moveleft(object, xUnit, rateUnit) {
    object.accelerationX -= xUnit * rateUnit;
}

export function moveright(object,xUnit,rateUnit) {
    object.accelerationX += xUnit * rateUnit;
}

export function stopMove(object) {
    //object.accelerationX = object.accelerationX*(-1);
    //object.accelerationY = object.accelerationY*(-1);
    //object.speedX = 0;
    //object.speedY = 0;

}
export function stopMoveX(object) {
    //if (object.maxSpeedX != 0)
    //object.accelerationX = object.accelerationX * (-1);
    //object.maxSpeedX = 0;
}
// new position
export function newHeadSnakePos(headSnake) {
    
    headSnake.speedX += headSnake.accelerationX;
    headSnake.accelerationX = 0;
    if (headSnake.maxSpeedX != null && headSnake.maxSpeedX < Math.abs(headSnake.speedX)) {
        headSnake.speedX = headSnake.speedX >= 0 ? headSnake.maxSpeedX : -headSnake.maxSpeedX;
    }
    headSnake.speedY += headSnake.accelerationY;
    headSnake.accelerationY = 0;
    if (headSnake.maxSpeedY != null && headSnake.maxSpeedY < Math.abs(headSnake.speedY)) {
        headSnake.speedY = headSnake.speedY >= 0 ? headSnake.maxSpeedY : -headSnake.maxSpeedY;
    }

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



