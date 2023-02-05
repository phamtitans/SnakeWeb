//display
export function clearScreen(screen) {
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    screen.context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);

}
export function updateScreen(myGameScreen, showList) {
    var ctx = myGameScreen.context;
    showList.forEach(function (value) {
        if (value != undefined) {

            ctx.fillStyle = value.color;
            ctx.fillRect(value.point.x, value.point.y, value.width, value.height);
        }
    });
}
