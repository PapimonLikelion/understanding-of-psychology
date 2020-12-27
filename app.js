import {
    Wall
} from './wall.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize(); 

        this.numberOfPictures = 3;
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.wall = new Wall(
            this.canvas.width,
            this.canvas.height,
        )
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.wall.drawWall(this.ctx);
        this.wall.drawPictureOnWall(this.ctx, this.numberOfPictures);
    }
}

window.onload = () => {
    new App();
}