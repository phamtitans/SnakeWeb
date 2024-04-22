





class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Block {
    constructor(x, y, color, height, width, weight) {
        this.point = new Point(x, y);
        this.color = color;
        this.height = height;
        this.width = width;
        this.weight = weight;
    }
    static RandomPointBlock(color, height, width, weight, excludeArr = [], xMax, yMax, xMin = 0, yMin = 0) {
        var x;
        var y;
        var flagStopRandom = false;
        while (flagStopRandom == false) {
            //console.log("x " + xMax);
            //console.log("y " + yMax);
            x = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
            y = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
            flagStopRandom = true;
            excludeArr.forEach(function (value) {
                if (
                    Math.abs(value.point.x - x) < Math.abs(width) &&
                    Math.abs(value.point.y - y) < Math.abs(height)
                ) {
                    flagStopRandom = false;
                    //x = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
                    //y = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
                }
            });
        }
        return new Block(x, y, color, height, width, weight);
    }
    static CloneBlock(blocks,xAdd=0,yAdd=0, newColor) {
        var newBlocks = [];
        blocks.forEach(function (value) {

            var newBlock = new Block(value.point.x + xAdd, value.point.y + yAdd, newColor ?? value.color, value.height, value.width, value.weight);
            newBlocks.push(newBlock);
        });
        return newBlocks;
    }
}

export class Component {
    constructor(blocks, maxSpeedX, maxSpeedY, minSpeedX, minSpeedY) {
        //this.blockList = [];
        this.blockList = blocks??[];
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeedX = maxSpeedX;
        this.maxSpeedY = maxSpeedY;
        this.minSpeedX = minSpeedX;
        this.minSpeedY = minSpeedY;
        
    }
    get direction() {

    if (this.speedX == 0 && this.speedY == 0)
        return "STOP";

    if (this.speedX == 0 && this.speedY < 0)
        return "UP";

    if (this.speedX == 0 && this.speedY > 0)
        return "DOWN";

    if (this.speedX > 0 && this.speedY == 0)
        return "RIGHT";

    if (this.speedX < 0 && this.speedY == 0)
        return "LEFT";

    if (this.speedX > 0 && this.speedY < 0)
        return "UP_RIGHT";

    if (this.speedX < 0 && this.speedY < 0)
        return "UP_LEFT";

    if (this.speedX > 0 && this.speedY > 0)
        return "DOWN_RIGHT";

    if (this.speedX < 0 && this.speedY > 0)
        return "DOWN_LEFT";

    //if (this.speedX > 0 && this.speedY < 0)
    //    return DirectionEnum.UP_RIGHT;

}
}
//enum DirectionEnum {
//    STOP = 0,
//    UP = 1,
//    DOWN = 2,
//    RIGHT = 3,
//    LEFT = 4,
//    UP_RIGHT = 5,
//    UP_LEFT = 6,
//    DOWN_RIGHT = 7,
//    DOWN_LEFT = 8
//}

