// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//var screenG = document.getElementById("screenG");
//var ctx = screenG.getContext("2d");
//ctx.fillStyle = "#FF0000";
//ctx.fillRect(0,0,150,75);



var myGamePiece;
var xUnit = 10;
var yUnit = 10;
var rateUnit = 0.1;
var rateDPS = 20;
var listPosOld = [];
function startGame() {
    console.log("alooo")
    myGamePiece = new component(xUnit, yUnit, "red", 10, 120);
    myGameArea.start();
}
var sDiv = document.getElementById("screenGDiv");
var myGameArea = {
    canvas: document.createElement("canvas"),
    //canvas: document.getElementById("screenG"),
    start: function () {
        //this.canvas.width = window.innerWidth;
        //this.canvas.height = window.innerHeight;
        this.canvas.width = sDiv.offsetWidth - $(sDiv).css('padding-left').replace('px', '')*2;
        this.canvas.height = sDiv.offsetWidth/2;
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementById("screenGDiv").insertBefore(this.canvas, document.getElementById("screenGDiv").childNodes[0]);
        this.interval = setInterval(updateGameArea, rateDPS);
    },
    clear: function () {
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//function component(width, height, color, x, y) {
//    this.width = width;
//    this.height = height;
//    this.speedX = 0;
//    this.speedY = 0;
//    this.x = x;
//    this.y = y;
//    this.update = function () {
//        ctx = myGameArea.context;
//        ctx.fillStyle = color;
//        ctx.fillRect(this.x, this.y, this.width, this.height);
//    }
//    this.newPos = function () {
//        this.x += this.speedX;
//        this.y += this.speedY;
//    }
//}

function updateGameArea() {
    myGameArea.clear();
    //savePos();
    myGamePiece.newPos();
    myGamePiece.update();
    showListPos();
}
function savePos() {
    var pos = { x: myGamePiece.x, y: myGamePiece.y };
    listPosOld.push(pos);
}
function moveup() {
    myGamePiece.speedY -= yUnit * rateUnit;
}

function movedown() {
    myGamePiece.speedY += yUnit * rateUnit;
}

function moveleft() {
    myGamePiece.speedX -= xUnit * rateUnit;
}

function moveright() {
    myGamePiece.speedX += xUnit * rateUnit;
}

function stopMove() {
    savePos();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

}
function showListPos() {
    var ctx1 = myGameArea.context;
    //console.log("list is : ${0}", listPosOld);
    listPosOld.forEach(l => {
        //console.log(l.x);
        ctx1.fillStyle = "blue";
        ctx1.fillRect(l.x, l.y, xUnit, yUnit);
    });
}

document.addEventListener("keydown", key => {
    switch (key.keyCode) {
        case 37:
            stopMove();
            moveleft();
            break;
        case 38:
            stopMove();
            moveup();
            break;
        case 39:
            stopMove();
            moveright();
            break;
        case 40:
            stopMove();
            movedown();
            break;
        case 32:
            stopMove();
            break;
    }
});