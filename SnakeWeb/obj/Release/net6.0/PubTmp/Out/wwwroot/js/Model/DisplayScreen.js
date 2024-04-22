
export class Screen {
    constructor(divId) {
        this.sDiv = document.getElementById(divId);
        this.canvas = document.createElement("canvas");
        this._context = null;
        this.width = this.sDiv.offsetWidth
        this.height = this.sDiv.offsetWidth / 2
    }
    get context() {
        //prepare screen
        if (this._context == null) {
            this.canvas.width = this.width - $(this.sDiv).css('padding-left').replace('px', '') * 2;
            this.canvas.height = this.height;
            this.sDiv.insertBefore(this.canvas, this.sDiv.childNodes[0]);
            //console.log(this.canvas.width)
            //console.log(this.canvas.height)
        };
        this._context = this.canvas.getContext("2d");
        return this._context;
    }
}
