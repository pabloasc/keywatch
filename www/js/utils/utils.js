angular.module('keywatch.utils', ['ionic'])

.factory('Draw', ['$window', function($window) {
  return  {
    initKeyboard: function($window) {
      var polygon1 = this.Polygon("canvas1","container1",150);
      var polygon2 = this.Polygon("canvas2","container2",150);
    },
    Triangle: function(position,canvas,width) {
        this.widthVal = width;
        this.heightVal = parseFloat(width) * 0.866;
        this.position = position;
        this.topHeight = 0;
        moveRight = (position * (this.widthVal/2)) - (this.widthVal/2);

        if(position >= 4) {
            moveRight = moveRight - (this.widthVal * 1.5);
            this.topHeight = this.heightVal;
            this.heightVal = (this.heightVal * 2) + 1;
        }

        this.p1 = (this.widthVal - this.widthVal) + moveRight;
        this.p2 = (this.widthVal / 2) + moveRight;
        this.p3 = (this.widthVal) + moveRight;

        var ctx = canvas.getContext("2d");
        ctx.beginPath();

        if(position < 4) {
            if(position == 2)  {
                ctx.moveTo(this.p1 - (this.widthVal / 2),this.heightVal - (this.heightVal * 2));
                ctx.lineTo((this.p2*2) - (this.widthVal / 2),this.topHeight);
                ctx.lineTo(this.p3 - (this.widthVal / 2),this.heightVal);
            }
            else {
                ctx.moveTo(this.p1,this.heightVal);
                ctx.lineTo(this.p2,this.topHeight);
                ctx.lineTo(this.p3,this.heightVal);
            }
        }
        else {
            if(position == 5)  {
                ctx.moveTo(this.p1,this.heightVal);
                ctx.lineTo((this.p2*2) - (this.widthVal),this.topHeight);
                ctx.lineTo(this.p3,this.heightVal);
            }
            else {
                ctx.moveTo(this.p1,this.topHeight);
                ctx.lineTo(this.p3,this.topHeight);
                ctx.lineTo(this.p2,this.heightVal);
            }
        }

        ctx.fillStyle="#FFF";
        ctx.strokeStyle = '#CCC';
        ctx.lineWidth = 1;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    },
    Polygon: function(canvasName,containerName,width) {
        this.widthVal = width;
        var canvas = document.getElementById(canvasName);
        var containerName = document.getElementById(containerName);
        canvas.style.position = "absolute";

        containerName.style.position = "relative";

        if(canvas.getContext)  {
            var triangle1 = this.Triangle(1,canvas,this.widthVal);
            var triangle2 = this.Triangle(2,canvas,this.widthVal);
            var triangle3 = this.Triangle(3,canvas,this.widthVal);
            var triangle4 = this.Triangle(4,canvas,this.widthVal);
            var triangle5 = this.Triangle(5,canvas,this.widthVal);
            var triangle6 = this.Triangle(6,canvas,this.widthVal);
        }
    }
  }
}])
