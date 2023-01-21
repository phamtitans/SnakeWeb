
// caculate
export function newHeadSnakePos(headSnake) {

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



