const pictureDescription = document.getElementById("jsSinglePictureDescription");
const pictureInstructionBackground = document.getElementById("jsSinglePictureInstruction");
const pictureInstructionFrame = document.getElementById("jsInstuction");
const pictureInstructionTitle = document.getElementById("jsInstructionTitle");
const pictureInstructionColor = document.getElementById("jsInstructionColor");
const pictureInstructionDetail = document.getElementById("jsInstructionDetail");

export class Ponzo {
    constructor(description, canvas, context) {
        this.description = description;
        this.canvas = canvas;
        this.ctx = context;
        this.isDown = false;

        this.instructionTitle = "Ponzo Illusion";
        this.instructionColor = "파란 선을";
        this.instructionDetail = "드래그해서 같은 길이인지 직접 확인해보세요!";

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    }

    showInstruction() {
        pictureInstructionBackground.style = "display : block";
        pictureInstructionFrame.style = "display : block";
        pictureInstructionTitle.innerText = this.instructionTitle;
        pictureInstructionColor.innerText = this.instructionColor;
        pictureInstructionColor.style = "color : blue";
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
        this.yUpLine = this.stageHeight * 1/8;
        this.xUpLineStart = this.stageWidth * 6.5/16;
        this.xUpLineEnd = this.stageWidth * 9.5/16;
        
        this.yBottomLine = this.stageHeight * 7/8;
        this.xBottomLineStart = this.stageWidth * 6.5/16;
        this.xBottomLineEnd = this.stageWidth * 9.5/16;
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
        /** Main Rail */
        var xLeftMainRailTop  = this.stageWidth * 7/16;
        var xLeftMainRailBottom = this.stageWidth * 4/16;
        var xRightMainRailTop  = this.stageWidth * 9/16;
        var xRightMainRailBottom = this.stageWidth * 12/16;
        var yMainRailTop = -30;
        var yMainRailBottom = this.stageHeight + 30;
        var mainRailWidth = 30;
        this.drawRail(xLeftMainRailTop, yMainRailTop, xLeftMainRailBottom, yMainRailBottom, mainRailWidth);
        this.drawRail(xRightMainRailTop, yMainRailTop, xRightMainRailBottom, yMainRailBottom, mainRailWidth);
        /** Row Rail */
        var rowRailNumber = 10;
        for (let i = 1; i <= rowRailNumber; i++) {
            var rowLineWidth = 8 + 2*i;
            var height = this.stageHeight * (Math.pow(i, 2) / 120); 
            var xStart = this.stageWidth/2 - this.stageWidth/10 - (this.stageWidth/16 * (Math.pow(i, 2) / 40));
            var xEnd =this.stageWidth/2 + this.stageWidth/10 + (this.stageWidth/16 * (Math.pow(i, 2) / 40));
            this.drawRail(xStart, height, xEnd, height, rowLineWidth);
        }
        /** 2 Lines */
        this.drawLine(this.xUpLineStart, this.xUpLineEnd, this.yUpLine);
        this.drawLine(this.xBottomLineStart, this.xBottomLineEnd, this.yBottomLine);
    }

    drawRail(xStart, yStart, xEnd, yEnd, lineWidth) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(xStart, yStart);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.stroke();
    }

    drawLine(xStart, xEnd, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 30;
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
        this.xAtDown = event.clientX;
        this.yAtDown = event.clientY;
        this.xConverted = this.convertX(this.xAtDown);
        this.yConverted = this.convertY(this.yAtDown);
        this.isDown = false;
        this.moveUpLine = false;
        this.moveBottomLine = false;
        var yMargin = 15;

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
            //Canvas의 Width 와 Height를 60%로 줄인다음 div에 집어넣기 때문에 역으로 10/6 만큼 곱해서 위치 변화 인지할 것
            var responsiveness = 10/6;
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
    }   

    up(event) {
        this.isDown = false;
        this.moveUpLine = false;
        this.moveBottomLine = false;
    }
}