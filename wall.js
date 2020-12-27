import {
    Picture
} from './picture.js';

export class Wall {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    drawWall(ctx) {
        this.xStart = this.width * 1.5/12;
        this.yStart = this.height * 1/12;
        this.mainWallWidth = this.width * 9/12;
        this.mainWallHeight = this.height * 8.5/12;

        /** Main Wall */
        ctx.fillStyle = '#fde3a7';
        ctx.beginPath();
        ctx.rect(this.xStart, this.yStart, this.mainWallWidth, this.mainWallHeight);
        ctx.fill();

        /** Top Wall */
        ctx.fillStyle = '#c68642';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.width, 0);
        ctx.lineTo(this.xStart + this.mainWallWidth, this.yStart);
        ctx.lineTo(this.xStart, this.yStart);
        ctx.fill();
    
        /** Bottom Wall */
        ctx.fillStyle = '#c68642';
        ctx.beginPath();
        ctx.moveTo(0, this.height);
        ctx.lineTo(this.width, this.height);
        ctx.lineTo(this.xStart + this.mainWallWidth, this.yStart + this.mainWallHeight);
        ctx.lineTo(this.xStart, this.yStart + this.mainWallHeight);
        ctx.fill();
    
        /** Left Wall */
        ctx.fillStyle = "#f1c27d";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.height);
        ctx.lineTo(this.xStart, this.yStart + this.mainWallHeight);
        ctx.lineTo(this.xStart, this.yStart);
        ctx.fill();
    
        /** Right wall */
        ctx.fillStyle = "#f1c27d";
        ctx.beginPath();
        ctx.moveTo(this.width, 0);
        ctx.lineTo(this.width, this.height);
        ctx.lineTo(this.xStart + this.mainWallWidth, this.yStart + this.mainWallHeight);
        ctx.lineTo(this.xStart + this.mainWallWidth, this.yStart);
        ctx.fill();
    }

    drawPictureOnWall(ctx, numberOfPictures) {
        this.pictures = [];

        for (let i = 0 ; i < numberOfPictures ; i++) {
            const picture = new Picture(
                this.xStart + (this.mainWallWidth * i/numberOfPictures),
                this.yStart,
                this.mainWallWidth * 1/numberOfPictures,
                this.mainWallHeight
                );
            this.pictures[i] = picture;
            this.pictures[i].drawPicture(ctx);
            this.pictures[i].drawNameTag(ctx);
        }
    }
}