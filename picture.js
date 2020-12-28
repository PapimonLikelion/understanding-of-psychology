export class Picture {
    constructor(xStart, yStart, width, height) {
        this.xPictureStart = xStart + width * 1/8;
        this.yPictureStart = yStart + height/5;
        this.pictureWidth = width * 3/4;
        this.pictureHeight = this.pictureWidth * 3/4;
        
        this.xNameTagStart = xStart + width * 1/3;
        this.yNameTagStart = yStart + (height * 2/3);
        this.nameTagWidth = width * 1/3;
        this.nameTagHeight = this.nameTagWidth * 3/4;
    }

    drawPicture(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(this.xPictureStart, this.yPictureStart, this.pictureWidth, this.pictureHeight);
        ctx.stroke();
    }

    drawNameTag(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(this.xNameTagStart, this.yNameTagStart, this.nameTagWidth, this.nameTagHeight);
        ctx.stroke();

        ctx.font = "13px Arial";
        ctx.fillText("Hello World", this.xNameTagStart, this.yNameTagStart + this.nameTagHeight/2);
    }
}