const pictureDescription = document.getElementById("jsSinglePictureDescription");

export class Ponzo {
    constructor(description, canvas, context) {
        this.description = description;
        this.canvas = canvas;
        this.ctx = context;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);
    }

    writeDescription() {
        pictureDescription.innerHTML = this.description; 
    }

    animate() {
        this.handle = window.requestAnimationFrame(this.animate.bind(this));
        this.draw();
    }

    stop() {
        window.cancelAnimationFrame(this.handle);
    }

    draw() {
        /** Main Rail */
        var xLeftMainRailTop  = this.stageWidth * 7/16;
        var xLeftMainRailBottom = this.stageWidth * 4/16;
        var xRightMainRailTop  = this.stageWidth * 9/16;
        var xRightMainRailBottom = this.stageWidth * 12/16;
        var yMainRailTop = -30;
        var yMainRailBottom = this.stageHeight + 30;
        var mainRailWidth = 30;
        this.drawRail(xLeftMainRailTop, yMainRailTop, xLeftMainRailBottom, yMainRailBottom, mainRailWidth);
        this.drawRail(xRightMainRailTop, yMainRailTop, xRightMainRailBottom, yMainRailBottom, mainRailWidth);
        /** Row Rail */
        var rowRailNumber = 10;
        for (let i = 1; i <= rowRailNumber; i++) {
            var rowLineWidth = 8 + 2*i;
            var height = this.stageHeight * (Math.pow(i, 2) / 120); 
            var xStart = this.stageWidth/2 - this.stageWidth/10 - (this.stageWidth/16 * (Math.pow(i, 2) / 40));
            var xEnd =this.stageWidth/2 + this.stageWidth/10 + (this.stageWidth/16 * (Math.pow(i, 2) / 40));
            this.drawRail(xStart, height, xEnd, height, rowLineWidth);
        }
        /** 2 Lines */
        var yFirstLine = this.stageHeight * 1/8;
        var ySecondLine = this.stageHeight * 7/8;
        var xLineStart = this.stageWidth * 6.5/16;
        var xLineEnd = this.stageWidth * 9.5/16;
        this.drawLine(xLineStart, xLineEnd, yFirstLine);
        this.drawLine(xLineStart, xLineEnd, ySecondLine);
    }

    drawRail(xStart, yStart, xEnd, yEnd, lineWidth) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(xStart, yStart);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.stroke();
    }

    drawLine(xStart, xEnd, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 30;
        this.ctx.moveTo(xStart, y);
        this.ctx.lineTo(xEnd, y);
        this.ctx.stroke();
    }
}