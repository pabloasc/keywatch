angular.module('keywatch.utils', ['ionic'])

.factory('Draw', ['$window', function() {
  return  {
    initKeyboard: function() {
      var polygon1 = this.Polygon("canvas1","container1",80);
      var polygon2 = this.Polygon("canvas2","container2",80);
      var polygon3 = this.Polygon("canvas3","container3",80);
      var polygon4 = this.Polygon("canvas4","container4",80);
      var polygon5 = this.Polygon("canvas5","container5",80);
      var polygon6 = this.Polygon("canvas6","container6",80);
      var polygon7 = this.Polygon("canvas7","container7",80);
    },
    Triangle: function(position,canvas,width, char) {
        this.widthVal = width;
        this.heightVal = parseFloat(width) * 0.866;
        this.position = position;
        this.topHeight = 0;
        moveRight = (position * (this.widthVal/2)) - (this.widthVal/2);
        if (position > 3) {
            moveRight = moveRight - (this.widthVal * 1.5);
            this.topHeight = this.heightVal;
            this.heightVal = (this.heightVal * 2) + 1;
        }

        this.p1 = (this.widthVal - this.widthVal) + moveRight;
        this.p2 = (this.widthVal / 2) + moveRight;
        this.p3 = (this.widthVal) + moveRight;

        var ctx = canvas.getContext("2d");
        ctx.beginPath();

        if (position % 2) {
          ctx.moveTo(this.p1,this.heightVal);
          ctx.lineTo(this.p2,this.topHeight);
          ctx.lineTo(this.p3,this.heightVal);
        } else {
          ctx.moveTo(this.p1,this.topHeight);
          ctx.lineTo(this.p3,this.topHeight);
          ctx.lineTo(this.p2,this.heightVal);
        }

        var grd = ctx.createLinearGradient(0, 0, this.widthVal, this.heightVal);
        grd.addColorStop(0, '#CCC');
        grd.addColorStop(1, '#FFF');
        ctx.fillStyle = grd;

        //ctx.fillStyle="#FFF";
        ctx.strokeStyle = '#CCC';
        ctx.lineWidth = 1;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#00CCCC";
        ctx.font = "bold 16px Calibri";
        ctx.fillText(char, moveRight + 25, this.heightVal);
    },
    Polygon: function(canvasName,containerName,width) {
        this.widthVal = width;
        this.chars = [ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P" ];
        var canvas = document.getElementById(canvasName);
        var containerName = document.getElementById(containerName);
        canvas.style.position = "absolute";
        containerName.style.position = "relative";

        if(canvas.getContext)  {
            for (i=1; i<7; i++) {
              this.Triangle(i, canvas, this.widthVal, this.chars[i - 1]);
            }
        }
    },
    AddChar: function(canvasName,containerName,width) {
        this.widthVal = width;
        var canvas = document.getElementById(canvasName);
        var containerName = document.getElementById(containerName);
        canvas.style.position = "absolute";

        containerName.style.position = "relative";

        if(canvas.getContext)  {
            for (i=1; i<7; i++) {
              this.Triangle(i,canvas,this.widthVal);
            }
        }
    }
  }
}])
