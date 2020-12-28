class App {
    constructor() {
        this.picture1 = document.getElementById("jsPicture1");
        this.picture2 = document.getElementById("jsPicture2");
        this.picture3 = document.getElementById("jsPicture3");
        this.description1 = document.getElementById("jsDescription1");
        this.description2 = document.getElementById("jsDescription2");
        this.description3 = document.getElementById("jsDescription3");

        this.writeDescription();
    }

    writeDescription() {
        this.description1.innerHTML = "<br> Müller-Lyer Illusion <br> <strong> 1889 </strong>";
        this.description2.innerHTML = "<br> Ponzo Illusion <br> <strong> 1911 </strong>";
        this.description3.innerHTML = "<br> Ehrenstein Illusion <br> <strong> 1841 </strong>";
    }
}

window.onload = () => {
    new App();
}