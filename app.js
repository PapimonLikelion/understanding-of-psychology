const wall = document.getElementById("jsWall");
const picture1 = document.getElementById("jsPicture1");
const picture2 = document.getElementById("jsPicture2");
const picture3 = document.getElementById("jsPicture3");
const description1 = document.getElementById("jsDescription1");
const description2 = document.getElementById("jsDescription2");
const description3 = document.getElementById("jsDescription3");
const singlePicture = document.getElementById("jsSinglePicture");
const singlePictureBackBtn = document.getElementById("jsSinglePictureBackBtn");

class App {
    constructor() {
        this.writeDescription();
        picture1.addEventListener("click", this.clickPicture1);
        picture2.addEventListener("click", this.clickPicture2);
        picture3.addEventListener("click", this.clickPicture3);
        singlePictureBackBtn.addEventListener("click", this.clickBack);
    }

    writeDescription() {
        description1.innerHTML = "<br> Müller-Lyer Illusion <br> <strong> 1889 </strong>";
        description2.innerHTML = "<br> Ponzo Illusion <br> <strong> 1911 </strong>";
        description3.innerHTML = "<br> Ehrenstein Illusion <br> <strong> 1841 </strong>";
    }

    clickPicture1() {
        wall.style.display = "none";
        singlePicture.style.display = "flex";
    }

    clickPicture2() {
        wall.style.display = "none";
        singlePicture.style.display = "flex";
    }

    clickPicture3() {
        wall.style.display = "none";
        singlePicture.style.display = "flex";
    }

    clickBack() {
        wall.style.display = "flex";
        singlePicture.style.display = "none";
    }
}

window.onload = () => {
    new App();
}