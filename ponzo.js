const pictureDescription = document.getElementById("jsSinglePictureDescription");

export class Ponzo {
    constructor(description) {
        this.description = description;
    }

    writeDescription() {
        pictureDescription.innerHTML = this.description; 
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(10, 10, 100, 100);
        ctx.fill();
    }
}