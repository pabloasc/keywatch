angular.module('keywatch.utils', ['ionic'])

.factory('Draw', function($q) {
  return  {
    initKeyboard: function($scope) {
      var polygon1 = new Polygon("canvas1","container1",150);
      var polygon2 = new Polygon("canvas2","container2",150);
    }
  }
})

function Triangle(position,canvas,width) {
	
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
    ctx.fillStyle="#CCC";
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
    
    ctx.closePath();
    ctx.fill();
}

Triangle.prototype.addLetter = function(containerName, letter, position) {
  var newNode = document.createElement('div');
  newNode.className = "letter_pos_" + position;
  newNode.innerHTML = letter;
  var rotate = 300 +(60 * parseInt(position));
  newNode.style.transform = "rotate("+rotate+"deg) scale(1)";
  newNode.style.zIndex = parseInt(position);
  if(position == 6) {
    newNode.style.top = "25px";
  }
  containerName.appendChild( newNode )
};

function Polygon(canvasName,containerName,width) {
    this.widthVal = width;
    var canvas = document.getElementById(canvasName);
    var containerName = document.getElementById(containerName);
    canvas.style.position = "absolute";
    
    containerName.style.position = "relative";
    /*
    containerName.style.top = "0px";
    containerName.style.left = "0px";
    */
    if(canvas.getContext)  {
        var triangle1 = new Triangle(1,canvas,this.widthVal);
        triangle1.addLetter(containerName,"a",1);
        var triangle2 = new Triangle(2,canvas,this.widthVal);
        triangle2.addLetter(containerName,"s",2);
        var triangle3 = new Triangle(3,canvas,this.widthVal);
        triangle3.addLetter(containerName,"d",3);
        var triangle4 = new Triangle(4,canvas,this.widthVal);
        triangle4.addLetter(containerName,"f",4);
        var triangle5 = new Triangle(5,canvas,this.widthVal);
        triangle5.addLetter(containerName,"g",5);
        var triangle6 = new Triangle(6,canvas,this.widthVal);
        triangle6.addLetter(containerName,"h",6);
    }
}


function init()
{
    var polygon1 = new Polygon("canvas1","container1",150);
    var polygon2 = new Polygon("canvas2","container2",150);
}