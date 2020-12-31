const pictureDescription = document.getElementById("jsSinglePictureDescription");

export class Ehrenstein {
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
        this.circleNumber = 8;
        this.xCenter = this.stageWidth / 2;
        this.yCenter = this.stageHeight / 2;
        for(let i = 1; i <= this.circleNumber; i++ ) {
        var radius = this.stageWidth < this.stageHeight
            ? i * this.stageWidth / (2*this.circleNumber + 1)
            : i * this.stageHeight / (2*this.circleNumber + 1);
            this.drawCircle(this.xCenter, this.yCenter, radius);
        }
        this.drawSquare(this.xCenter, this.yCenter);
    }

    drawCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 10;
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    drawSquare(xCenter, yCenter) {
        var interval = this.stageWidth < this.stageHeight
            ? this.stageWidth * 0.4
            : this.stageHeight * 0.4;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 20;
        this.ctx.moveTo(xCenter, yCenter-interval);
        this.ctx.lineTo(xCenter-interval, yCenter);
        this.ctx.lineTo(xCenter, yCenter+interval);
        this.ctx.lineTo(xCenter+interval, yCenter);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}