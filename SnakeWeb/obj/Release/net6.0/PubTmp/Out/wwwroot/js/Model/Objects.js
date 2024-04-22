import { Block,Component } from './Material.js';
//import { Component } from './Material.js';

export class Snake {
    constructor(excludeBlock = [], xMax, yMax) {
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

        console.log("x " + xMax);
        console.log("y " + yMax);
        var block = Block.RandomPointBlock(color, height, width, weight, excludeBlock, xMax, yMax);
        var blocks = [block];
        this.head = new Component(blocks);
        this.body = new Component();
    }
}

export class Food {
    constructor(excludeBlock = [], area = []) {
        console.log(area)
        this.height = 10;
        this.width = 10;
        this.color = "orange";
        this.weight = 0;
        var block1 = Block.RandomPointBlock(this.color, this.height, this.width, this.weight, excludeBlock, area[0] - this.width, area[1] - this.height);
        excludeBlock.push(block1);
        var block2 = Block.RandomPointBlock(this.color, this.height, this.width, this.weight, excludeBlock, area[0] - this.width, area[1] - this.height);
        var blocks = [block1, block2];
        this.elements = new Component(blocks);
    }
}

export class Obstackle {
    constructor(area = [],numSplit = 1.5) {
        this.color = "red";
        this.height = 10;
        this.width = 10;
        var seedBlocks = []
        for (var i = 0; i < numSplit * numSplit ; i++) {
            var xMax = area[0] * (i + 1) / numSplit - this.width * 2;
            var xMin = area[0] * i / numSplit + this.width * 2;
            for (var j = 0; j < numSplit * numSplit; j++) {
                var yMax = area[1] * (j + 1) / numSplit - this.height * 2;
                var yMin = area[1] * j / numSplit + this.height * 2;
                var seedBlock = Block.RandomPointBlock(this.color, this.height, this.width, this.weight, [], xMax, yMax, xMin, yMin);
                seedBlocks.push(seedBlock);
            }
        }
        var blocks = [];
        blocks.push(...seedBlocks);
        seedBlocks.forEach(function (value,index) {
            if (index % 2 == 0) {
                for (var i = 0; i < 2;i++) {
                    var newCloneBlocks1 = Block.CloneBlock([value], 10 + i * 10, 0, value.color);
                    blocks.push(...newCloneBlocks1);
                    var newCloneBlocks2 = Block.CloneBlock([value], 0, 10 + i * 10, value.color);
                    blocks.push(...newCloneBlocks2);
                }
            }
            else {
                for (var i = 0; i < 2; i++) {
                    var newCloneBlocks1 = Block.CloneBlock([value], -10 - i * 10, 0, value.color);
                    blocks.push(...newCloneBlocks1);
                    var newCloneBlocks2 = Block.CloneBlock([value], 0, -10 - i * 10, value.color);
                    blocks.push(...newCloneBlocks2);
                }
            }
        });
        this.Component = new Component(blocks);
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
        this.Name = "Player" + (Math.random() * 100000).toString().slice(0,5)
        this.Score = new Score();
        this.Snake = snake;
        this.GameOver = false;
    }
}