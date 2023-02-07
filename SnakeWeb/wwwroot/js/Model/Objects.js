import { Block,Component } from './Material.js';
//import { Component } from './Material.js';

export class Snake {
    constructor(excludeBlock = []) {
        //var x = 0;
        //var y = 100;
        var height = 10;
        var width = 10;
        var color = "red";
        var weight = 1;
        //var block1 = Block.RandomPointBlock(color, height, width, weight,[]);
        //var block2 = Block.RandomPointBlock(color, height, width, weight, [block1]);
        //var block3 = Block.RandomPointBlock(color, height, width, weight, [block1, block2]);
        //var block4 = Block.RandomPointBlock(color, height, width, weight, [block1, block2, block3]);
        //var block5 = Block.RandomPointBlock(color, height, width, weight, [block1, block2, block3,block4]);
        //var block6 = Block.RandomPointBlock(color, height, width, weight, [block1, block2, block3, block4, block5]);
        var block = Block.RandomPointBlock(color, height, width, weight, excludeBlock);
        var blocks = [block];
        this.head = new Component(blocks);
        this.body = new Component();
    }
}

export class Food {
    constructor(excludeBlock = []) {
        this.height = 10;
        this.width = 10;
        this.color = "orange";
        this.weight = 0;
        var block1 = Block.RandomPointBlock(this.color, this.height, this.width, this.weight, excludeBlock);
        excludeBlock.push(block1);
        var block2 = Block.RandomPointBlock(this.color, this.height, this.width, this.weight, excludeBlock);
        var blocks = [block1, block2];
        this.elements = new Component(blocks);
    }
}
export class Score {
    constructor() {
        this.color = "black",
        this.size = "30px",
        this.style = "Consolas",
        this.width = 400,
        this.height = 40,
        this.value = 0
    }
}
export class Player {
    constructor(snake) {
        this.Score = new Score();
        this.Snake = snake;
    }
}