const pictureDescription = document.getElementById("jsSinglePictureDescription");
const pictureInstructionBackground = document.getElementById("jsSinglePictureInstruction");
const pictureInstructionFrame = document.getElementById("jsInstuction");
const pictureInstructionTitle = document.getElementById("jsInstructionTitle");
const pictureInstructionColor = document.getElementById("jsInstructionColor");
const pictureInstructionDetail = document.getElementById("jsInstructionDetail");

export class Muller {
    constructor(description, canvas, context) {
        this.description = description;
        this.canvas = canvas;
        this.ctx = context;
        this.isDown = false;

        this.instructionTitle = "Müller-Lyer Illusion";
        this.instructionColor = "회색 선을";
        this.instructionDetail = "드래그해서 같은 길이인지 직접 확인해보세요!";

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    }

    showInstruction() {
        pictureInstructionBackground.style = "display : block";
        pictureInstructionFrame.style = "display : block";
        pictureInstructionTitle.innerText = this.instructionTitle;
        pictureInstructionColor.innerText = this.instructionColor;
        pictureInstructionColor.style = "color : gray";
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
        this.xUpLineStart = this.stageWidth * 5.5/16;
        this.xUpLineEnd = this.stageWidth * 10.5/16;
        this.yUpLine = this.stageHeight * 1/3;
        
        this.xBottomLineStart = this.stageWidth * 5.5/16;
        this.xBottomLineEnd =  this.stageWidth * 10.5/16
        this.yBottomLine = this.stageHeight * 2/3;
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
        /** 아래에 배치될 선 안의 원 */
        this.drawCircle(xBottomLeftCircle, yBottomCircle, radius);
        this.drawCircle(xBottomRightCircle, yBottomCircle, radius);
        /** 위에 배치될 원 사이의 선 */
        this.drawLine(this.xUpLineStart, this.xUpLineEnd, this.yUpLine);
        /** 아래에 배치될 원 사이의 선 */
        this.drawLine(this.xBottomLineStart, this.xBottomLineEnd, this.yBottomLine);
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
        this.xConverted = this.convertX(this.xAtDown);
        this.yConverted = this.convertY(this.yAtDown);
        this.isDown = false;
        this.moveUpLine = false;
        this.moveBottomLine = false;
        var yMargin = 10;

        //위의 선을 선택했을 경우
        if ((this.xUpLineStart <= this.xConverted) && (this.xConverted <= this.xUpLineEnd) && 
            (this.yUpLine - yMargin <= this.yConverted) && (this.yConverted <= this.yUpLine + yMargin)) {
            this.isDown = true;
            this.moveUpLine = true;
        }
        
        //아래의 선을 선택했을 경우
        if ((this.xBottomLineStart <= this.xConverted) && (this.xConverted <= this.xBottomLineEnd) && 
            (this.yBottomLine - yMargin <= this.yConverted) && (this.yConverted <= this.yBottomLine + yMargin)) {
            this.isDown = true;
            this.moveBottomLine = true;
        }
    }

    move(event) {
        if (this.isDown) {
            if (event.clientX) {
                this.movePC(event);
            } else {
                this.moveMobile(event)
            }
        }
    }   

    movePC(event) {
        //Canvas의 Width 와 Height를 60%로 줄인다음 div에 집어넣기 때문에 역으로 10/6 만큼 곱해서 위치 변화 인지할 것
        var responsiveness = 10/6;
        /** PC version */
        while ((this.xAtDown != event.clientX) || (this.yAtDown != event.clientY)) {
            if (this.moveUpLine) {
                this.xUpLineStart = this.xUpLineStart - (this.xAtDown * responsiveness) + (event.clientX * responsiveness);
                this.xUpLineEnd = this.xUpLineEnd - (this.xAtDown * responsiveness) + (event.clientX * responsiveness);
                this.yUpLine = this.yUpLine - (this.yAtDown * responsiveness) + (event.clientY * responsiveness);
            } else if (this.moveBottomLine) {
                this.xBottomLineStart = this.xBottomLineStart - (this.xAtDown * responsiveness) + (event.clientX * responsiveness);
                this.xBottomLineEnd = this.xBottomLineEnd - (this.xAtDown * responsiveness) + (event.clientX * responsiveness);
                this.yBottomLine = this.yBottomLine - (this.yAtDown * responsiveness) + (event.clientY * responsiveness);
            }       
            this.xAtDown = event.clientX;
            this.yAtDown = event.clientY;
        }
    }

    moveMobile(event) {
        //Canvas의 Width 와 Height를 60%로 줄인다음 div에 집어넣기 때문에 역으로 10/6 만큼 곱해서 위치 변화 인지할 것
        var responsiveness = 10/6;
        /** Mobile version */
        while ((this.xAtDown != event.touches[0].clientX) || (this.yAtDown != event.touches[0].clientY)) {
            if (this.moveUpLine) {
                this.xUpLineStart = this.xUpLineStart - (this.xAtDown * responsiveness) + (event.touches[0].clientX * responsiveness);
                this.xUpLineEnd = this.xUpLineEnd - (this.xAtDown * responsiveness) + (event.touches[0].clientX * responsiveness);
                this.yUpLine = this.yUpLine - (this.yAtDown * responsiveness) + (event.touches[0].clientY * responsiveness);
            } else if (this.moveBottomLine) {
                this.xBottomLineStart = this.xBottomLineStart - (this.xAtDown * responsiveness) + (event.touches[0].clientX * responsiveness);
                this.xBottomLineEnd = this.xBottomLineEnd - (this.xAtDown * responsiveness) + (event.touches[0].clientX * responsiveness);
                this.yBottomLine = this.yBottomLine - (this.yAtDown * responsiveness) + (event.touches[0].clientY * responsiveness);
            }      
            this.xAtDown = event.touches[0].clientX;
            this.yAtDown = event.touches[0].clientY; 
        }
    }

    up(event) {
        this.isDown = false;
        this.moveUpLine = false;
        this.moveBottomLine = false;
    }
}