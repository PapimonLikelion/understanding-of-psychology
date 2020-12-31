const pictureDescription = document.getElementById("jsSinglePictureDescription");

export class Muller {
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
        var radius = this.stageWidth * 1/16;
        var xTopLeftCircle = this.stageWidth * 4.5/16; 
        var xTopRightCircle = this.stageWidth * 11.5/16; 
        var xBottomLeftCircle = this.stageWidth * 6.5/16;
        var xBottomRightCircle = this.stageWidth * 9.5/16;
        var yTopCircle = this.stageHeight * 1/3;
        var yBottomCircle = this.stageHeight * 2/3;
        /** 위에 배치될 선 밖의 원 */
        this.drawCircle(xTopLeftCircle, yTopCircle, radius);
        this.drawCircle(xTopRightCircle, yTopCircle, radius);
        /** 위에 배치될 원 사이의 선 */
        this.drawLine(xTopLeftCircle + radius, xTopRightCircle - radius, yTopCircle);
        /** 아래에 배치될 선 안의 원 */
        this.drawCircle(xBottomLeftCircle, yBottomCircle, radius);
        this.drawCircle(xBottomRightCircle, yBottomCircle, radius);
        /** 아래에 배치될 원 사이의 선 */
        this.drawLine(xBottomLeftCircle - radius, xBottomRightCircle + radius, yBottomCircle);
    }

    drawCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 15;
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    drawLine(xStart, xEnd, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "gray";
        this.ctx.lineWidth = 20;
        this.ctx.moveTo(xStart, y);
        this.ctx.lineTo(xEnd, y);
        this.ctx.stroke();
    }
}