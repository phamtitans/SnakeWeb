import { Block } from './Model/Material.js';
import { Component } from './Model/Material.js';
////import { DisplayEngine } from './Engine/Display/DisplayEngine.js'
var x = 0;
var y = 0;
var height = 10;
var width = 20;
var color = "";
var weight = 1;
var block = new Block(x, y, color, height, width, weight);
var blocks = [block];
var component = new Component(blocks);
console.log(component.direction);
