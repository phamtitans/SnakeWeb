
var myGamePiece;
var myGameArea;
function startGame() {
    console.log("alooo");
    myGamePiece = new component(xUnit, yUnit, "red", 10, 120);
    myGameArea = new Screen("screenGDiv", 20, 10, 10);
    myGameArea.start();
}



class Screen {
    constructor(divId, rateDPS, xUnit, yUnit) {
        //this.myGamePiece = new component(xUnit, yUnit, "red", 10, 120),
        this.sDiv = document.getElementById(divId);
        this.canvas = document.createElement("canvas");
        //canvas: document.getElementById("screenG"),
        this.start = function () {
            this.canvas.width = this.sDiv.offsetWidth - $(this.sDiv).css('padding-left').replace('px', '') * 2;
            this.canvas.height = this.sDiv.offsetWidth / 2;
            this.context = this.canvas.getContext("2d");
                
            this.sDiv.insertBefore(this.canvas, this.sDiv.childNodes[0]);
            this.interval = setInterval(updateGameArea, rateDPS);
            //this.interval = setInterval(this.updateScreen, rateDPS);
        },
        this.clear = function () {
            //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        }
    }
    //updateScreen() {
    //    this.clear;
    //    //savePos();
    //    var myGamePiece = new component(xUnit, yUnit, "red", 10, 120);

    //    myGamePiece.newPos();
    //    myGamePiece.update(this.context);
    //    //showListPos();
    //}
}

class component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 1;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        //this.context = context;
        this.update = function () {
            var ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
}


function updateGameArea() {
    myGameArea.clear();
    //savePos();
    myGamePiece.newPos();
    myGamePiece.update();
    //showListPos();
}