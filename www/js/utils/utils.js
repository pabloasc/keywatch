angular.module('keywatch.utils', ['ionic'])


.factory('Draw', ['$window', function($window, $scope, $rootScope, $timeout) {
  return  {
    initKeyboard: function($scope, $rootScope, $timeout) {

      $scope.triangles = {};
      $scope.cant = 1;

      var chars = [];
      chars[11] = ".";
      chars[12] = "/";
      chars[13] = "@";
      chars[14] = "r";
      chars[15] = "t";
      chars[16] = "y";

      chars[21] = "q";
      chars[22] = "w";
      chars[23] = "e";
      chars[24] = "a";
      chars[25] = "s";
      chars[26] = "d";

      chars[31] = "u";
      chars[32] = "i";
      chars[33] = "o";
      chars[34] = "j";
      chars[35] = "k";
      chars[36] = "p";

      chars[41] = "f";
      chars[42] = "g";
      chars[43] = "h";
      chars[44] = "v";
      chars[45] = "b";
      chars[46] = "n";

      chars[51] = "z";
      chars[52] = "x";
      chars[53] = "c";
      chars[54] = "1";
      chars[55] = "2";
      chars[56] = "3";

      chars[61] = "m";
      chars[62] = "l";
      chars[63] = "ñ";
      chars[64] = "7";
      chars[65] = "8";
      chars[66] = "9";

      chars[71] = "4";
      chars[72] = "5";
      chars[73] = "6";
      chars[74] = "0";
      chars[75] = "|_|";
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

      for (j = 1; j < 8; j++) {
        this.Polygon(j, "canvas" + j, "container" + j, 120, $scope, $rootScope);
      }

      $rootScope.triangles = $scope.triangles;

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

          $scope.triangles[id] = {  'p1X': this.p1, 'p1Y': this.heightVal,
                                    'p2X': this.p2, 'p2Y': this.topHeight,
                                    'p3X': this.p3, 'p3Y': this.heightVal,
                                    'idP': idP, 'char' : char, 'w': width
                                  };

          ctx.moveTo($scope.triangles[id].p1X, $scope.triangles[id].p1Y);
          ctx.lineTo($scope.triangles[id].p2X, $scope.triangles[id].p2Y);
          ctx.lineTo($scope.triangles[id].p3X, $scope.triangles[id].p3Y);
        } else {
          $scope.triangles[id] = {  'p1X': this.p1, 'p1Y': this.topHeight,
                                    'p2X': this.p3, 'p2Y': this.topHeight,
                                    'p3X': this.p2, 'p3Y': this.heightVal,
                                    'idP': idP, 'char' : char, 'w': width
                                  };

          ctx.moveTo($scope.triangles[id].p1X, $scope.triangles[id].p1Y);
          ctx.lineTo($scope.triangles[id].p2X,$scope.triangles[id].p2Y);
          ctx.lineTo($scope.triangles[id].p3X, $scope.triangles[id].p3Y);
        }

        var minX = Math.min(this.p1, this.p2, this.p3);
        var maxX = Math.max(this.p1, this.p2, this.p3);
        var minY = Math.min(this.topHeight, this.heightVal);
        var maxY = Math.max(this.topHeight, this.heightVal);

        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = '#d8d8d8';
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
            }
          }
          y = this.closestMultiple(minY);
        }

        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#4078c0";
        ctx.font = "bold 16px Arial";
        ctx.fillText(char, moveRight + 55, this.heightVal - 55);

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
    singleTriangle: function(p1X, p1Y, p2X, p2Y, p3X, p3Y, idP, char, width, pressed) {
      this.widthVal = width;
      this.heightVal = parseFloat(width) * 0.866;
      this.topHeight = 0;
      var canvasName = "canvas" + idP;
      var containerName = "container" + idP;
      var canvas = document.getElementById(canvasName);
      var container = document.getElementById(containerName);
      canvas.style.position = "absolute";
      container.style.position = "relative";

      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(p1X, p1Y);
      ctx.lineTo(p2X, p2Y);
      ctx.lineTo(p3X, p3Y);

      ctx.strokeStyle = '#d8d8d8';
      ctx.lineWidth = 1;

      ctx.closePath();
      pressed ? ctx.fillStyle="#4078c0" : ctx.fillStyle="#FFFFFF";
      ctx.fill();
      ctx.stroke();

      pressed ? ctx.fillStyle="#FFF" : ctx.fillStyle="#4078c0";
      ctx.font = "bold 18px Arial";
      ctx.fillText(char, p1X + 55, p3Y - 55);
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
