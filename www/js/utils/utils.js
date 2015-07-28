angular.module('keywatch.utils', ['ionic'])


.factory('Draw', ['$window', function($window, $scope, $rootScope, $timeout) {
  return  {
    initKeyboard: function($scope, $rootScope, $timeout) {

      $scope.triangles = {};
      $scope.cant = 1;
      
      var chars = [];
      chars[11] = "OK";
      chars[12] = ":)";
      chars[13] = ":(";
      chars[14] = "R";
      chars[15] = "T";
      chars[16] = "Y";

      chars[21] = "Q";
      chars[22] = "W";
      chars[23] = "E";
      chars[24] = "A";
      chars[25] = "S";
      chars[26] = "D";

      chars[31] = "U";
      chars[32] = "I";
      chars[33] = "O";
      chars[34] = "J";
      chars[35] = "K";
      chars[36] = "P";

      chars[41] = "F";
      chars[42] = "G";
      chars[43] = "H";
      chars[44] = "V";
      chars[45] = "B";
      chars[46] = "N";

      chars[51] = "Z";
      chars[52] = "X";
      chars[53] = "C";
      chars[54] = "1";
      chars[55] = "2";
      chars[56] = "3";

      chars[61] = "M";
      chars[62] = "L";
      chars[63] = "Ñ";
      chars[64] = "7";
      chars[65] = "8";
      chars[66] = "9";

      chars[71] = "4";
      chars[72] = "5";
      chars[73] = "6";
      chars[74] = "0";
      chars[75] = "_";
      chars[76] = "<-";

      $scope.chars = chars;

      var pPol = [];
      
      pPol[11] = 50;
      pPol[12] = 240;

      pPol[21] = 154;
      pPol[22] = 60;

      pPol[31] = 154;
      pPol[32] = 420;

      pPol[41] = 259;
      pPol[42] = 240;

      pPol[51] = 363;
      pPol[52] = 60;

      pPol[61] = 363;
      pPol[62] = 420;

      pPol[71] = 467;
      pPol[72] = 240;

      $scope.pPol = pPol;

      //$rootScope.gridID = [];

      for (j = 1; j < 8; j++) {
        if (typeof RootScope === 'undefined') {
          RootScope = this.Polygon(j, "canvas" + j, "container" + j, 120, $scope, $rootScope);
        } else {
          RootScope = that.Polygon(j, "canvas" + j, "container" + j, 120, $scope, RootScope);
        }
         
      
      }
    },
    Triangle: function(position, canvas, width, char, idP, id, $scope, $rootScope) {
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
          $scope.triangles[id] = { 'p1X': this.p1, 'p1Y': this.heightVal };
          ctx.moveTo($scope.triangles[id].p1X, $scope.triangles[id].p1Y);
           $scope.triangles[id] = { 'p2X': this.p2, 'p2Y': this.topHeight };
          ctx.lineTo($scope.triangles[id].p2X, $scope.triangles[id].p2Y);
          $scope.triangles[id] = { 'p3X': this.p3, 'p3Y': this.heightVal };
          ctx.lineTo($scope.triangles[id].p3X, $scope.triangles[id].p3Y);
        } else {
          $scope.triangles[id] = { 'p1X': this.p1, 'p1Y': this.topHeight };
          ctx.moveTo($scope.triangles[id].p1X, $scope.triangles[id].p1Y);
           $scope.triangles[id] = { 'p2X': this.p3, 'p2Y': this.topHeight };
          ctx.lineTo($scope.triangles[id].p2X,$scope.triangles[id].p2Y);
          $scope.triangles[id] = { 'p3X': this.p2, 'p3Y': this.heightVal };
          ctx.lineTo($scope.triangles[id].p3X, $scope.triangles[id].p3Y);
        }

        var minX = Math.min(this.p1, this.p2, this.p3);
        var maxX = Math.max(this.p1, this.p2, this.p3);
        var minY = Math.min(this.topHeight, this.heightVal);
        var maxY = Math.max(this.topHeight, this.heightVal);

        var grd = ctx.createLinearGradient(0, 0, this.widthVal, this.heightVal);
        grd.addColorStop(0, '#CCC');
        grd.addColorStop(1, '#FFF');
        ctx.fillStyle = grd;

        ctx.strokeStyle = '#CCC';
        ctx.lineWidth = 1;

        var xMoved = 0;
        var yMoved = 0;

        //fill the array with key positions
        for (x = this.closestMultiple(minX); x <= this.closestMultiple(maxX); x = x + 5) {
          for (y = this.closestMultiple(minY); y <= this.closestMultiple(maxY); y = y + 5) {
            if(ctx.isPointInPath(x,y)) {
              xMoved = y + this.closestMultiple($scope.pPol[idP.toString()+"1"]);
              yMoved = x + this.closestMultiple($scope.pPol[idP.toString()+"2"]);
              $rootScope.gridID[xMoved+'x'+yMoved] = id;
              document.getElementById('output').innerHTML += "<span style='position:absolute;top:"+ xMoved +"px;left:"+yMoved+"px;'>.</span>";
            }
          }
          y = this.closestMultiple(minY);
        }

        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#444444";
        ctx.font = "bold 16px Arial";
        ctx.fillText(char, moveRight + 55, this.heightVal - 55);

        return $rootScope;
    },
    Polygon: function(id, canvasName, containerName, width, $scope, $rootScope) {
        this.widthVal = width;
        var canvas = document.getElementById(canvasName);
        var containerName = document.getElementById(containerName);
        canvas.style.position = "absolute";
        containerName.style.position = "relative";

        if(canvas.getContext)  {
            for (i=1; i<7; i++) {
              var idStr = id.toString()+i.toString();
              var that = this;
              this.Triangle(i, canvas, this.widthVal, $scope.chars[idStr], id, idStr, $scope, $rootScope);
              
            }
        }
    },
    closestMultiple: function(n) {
      if (n > 0) {
          return Math.ceil(n/5.0) * 5;
      } else if ( n < 0) {
          return Math.floor(n/5.0) * 5;
      } else {
          return 5;
      }
    }
  }
}])

