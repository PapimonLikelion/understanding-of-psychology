const pictureDescription = document.getElementById("jsSinglePictureDescription");
const pictureInstructionBackground = document.getElementById("jsSinglePictureInstruction");
const pictureInstructionFrame = document.getElementById("jsInstuction");
const pictureInstructionTitle = document.getElementById("jsInstructionTitle");
const pictureInstructionColor = document.getElementById("jsInstructionColor");
const pictureInstructionDetail = document.getElementById("jsInstructionDetail");

export class Ehrenstein {
    constructor(description, canvas, context) {
        this.description = description;
        this.canvas = canvas;
        this.ctx = context;
        this.isDown = false;

        this.instructionTitle = "Ehrenstein Illusion";
        this.instructionColor = "빨간 선 안의 영역을";
        this.instructionDetail = "드래그해서 정사각형인지 직접 확인해보세요!";

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    }

    showInstruction() {
        pictureInstructionBackground.style = "display : block";
        pictureInstructionFrame.style = "display : block";
        pictureInstructionTitle.innerText = this.instructionTitle;
        pictureInstructionColor.innerText = this.instructionColor;
        pictureInstructionColor.style = "color : red";
        pictureInstructionDetail.innerText = this.instructionDetail;
        setTimeout(this.disappearInstruction, 3000);
    }
    
    disappearInstruction() {
        pictureInstructionBackground.style = "display:none";
        pictureInstructionFrame.style = "display:none";
    }
    
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);
        
        this.animateInitialize();
    }

    writeDescription() {
        pictureDescription.innerHTML = this.description; 
    }

    animateInitialize() {
        this.xCenter = this.stageWidth / 2;
        this.yCenter = this.stageHeight / 2;
    }

    animate() {
        this.handle = window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.draw();
    }

    stop() {
        window.cancelAnimationFrame(this.handle);
    }

    draw() {
        this.circleNumber = 8;
        for(let i = 1; i <= this.circleNumber; i++ ) {
            var xCircleCenter = this.stageWidth / 2;
            var yCircleCenter = this.stageHeight / 2;
            var radius = this.stageWidth < this.stageHeight
                ? i * this.stageWidth / (2*this.circleNumber + 1)
                : i * this.stageHeight / (2*this.circleNumber + 1);
            this.drawCircle(xCircleCenter, yCircleCenter, radius);
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
        this.interval = this.stageWidth < this.stageHeight
            ? this.stageWidth * 0.4
            : this.stageHeight * 0.4;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 20;
        this.ctx.moveTo(xCenter, yCenter-this.interval);
        this.ctx.lineTo(xCenter-this.interval, yCenter);
        this.ctx.lineTo(xCenter, yCenter+this.interval);
        this.ctx.lineTo(xCenter+this.interval, yCenter);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    convertX(beforeX) {
        var afterX = (beforeX - this.stageWidth/5) * (10/6);
        return afterX;
    }

    convertY(beforeY) {
        var afterY = (beforeY - 90) * (10/6);
        return afterY;
    }

    down(event) {
        /** PC version */
        if (event.clientX) {
            this.xAtDown = event.clientX;
            this.yAtDown = event.clientY;
        } 
        /** Mobile version */
        else {
            this.xAtDown = event.touches[0].clientX;
            this.yAtDown = event.touches[0].clientY;
        }
        this.isDown = false;
        this.xConverted = this.convertX(this.xAtDown);
        this.yConverted = this.convertY(this.yAtDown);
        //정사각형 안의 범위를 선택한 경우
        if ((this.xCenter + (this.yCenter - this.interval) <= this.xConverted + this.yConverted) && 
            (this.xConverted + this.yConverted <= this.xCenter + (this.yCenter + this.interval)) && 
            (this.xCenter - (this.yCenter + this.interval) <= this.xConverted - this.yConverted) && 
            (this.xConverted - this.yConverted <= this.xCenter - (this.yCenter - this.interval))) {
            this.isDown = true;
        }
    }

    move(event) {
        if(this.isDown) {
            if (event.clientX ) {
                this.movePC(event);
            } else {
                this.moveMobile(event);
            }
        }
    }   

    movePC(event) {
        //Canvas의 Width 와 Height를 60%로 줄인다음 div에 집어넣기 때문에 역으로 10/6 만큼 곱해서 위치 변화 인지할 것
        var responsiveness = 10/6;
        /** PC version */
        while ((this.xAtDown != event.clientX) || (this.yAtDown != event.clientY)) {
            this.xCenter = this.xCenter - (this.xAtDown * responsiveness) + (event.clientX * responsiveness);
            this.yCenter = this.yCenter - (this.yAtDown * responsiveness) + (event.clientY * responsiveness);
            this.xAtDown = event.clientX;
            this.yAtDown = event.clientY;
        }
    }

    moveMobile(event) {
        //Canvas의 Width 와 Height를 60%로 줄인다음 div에 집어넣기 때문에 역으로 10/6 만큼 곱해서 위치 변화 인지할 것
        var responsiveness = 10/6;
        /** Mobile version */
        while ((this.xAtDown != event.touches[0].clientX) || (this.yAtDown != event.touches[0].clientY)) {
            this.xCenter = this.xCenter - (this.xAtDown * responsiveness) + (event.touches[0].clientX * responsiveness);
            this.yCenter = this.yCenter - (this.yAtDown * responsiveness) + (event.touches[0].clientY * responsiveness);
            this.xAtDown = event.touches[0].clientX;
            this.yAtDown = event.touches[0].clientY;
        }
    }    

    up(event) {
        this.isDown = false;
    }
}