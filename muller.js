const pictureDescription = document.getElementById("jsSinglePictureDescription");

export class Muller {
    constructor(description) {
        this.description = description;
    }

    writeDescription() {
        pictureDescription.innerHTML = this.description;
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.rect(10, 10, 100, 100);
        ctx.fill();
    }
}