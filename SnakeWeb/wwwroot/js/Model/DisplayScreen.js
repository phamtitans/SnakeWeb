
export class Screen {
    constructor(divId) {
        this.sDiv = document.getElementById(divId);
        this.canvas = document.createElement("canvas");
        this._context = null;
    }
    get context() {
        //prepare screen
        if (this._context == null) {
            this.canvas.width = this.sDiv.offsetWidth - $(this.sDiv).css('padding-left').replace('px', '') * 2;
            this.canvas.height = this.sDiv.offsetWidth / 2;
            this.sDiv.insertBefore(this.canvas, this.sDiv.childNodes[0]);
        };
        this._context = this.canvas.getContext("2d");
        return this._context;
    }
}
