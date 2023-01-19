﻿





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
}

export class Component {
    constructor(blocks) {
        //this.blockList = [];
        this.blockList = blocks;
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.speedX = 0;
        this.speedY = 0;
        
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

class Snake {
    constructor() {
        this.head = new Component();
        this.body = new Component();

    }
}