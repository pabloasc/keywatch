angular.module('keywatch.directives', ['ionic'])

.controller('MyGestures', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

  $scope.data = {
    posX : 0,
    posY : 0
  };

  var pressingID = 1;
  var XYMult = 2.4;
  var XdiffDist = 70;
  var YdiffDist = 300;
  var XYMultPos = 1.45;
  var XaddDist = 135;
  var YaddDist = 25;


  $scope.display = "block";

  //find the closest multiple to five
  $scope.closestMultiple = function(n) {
    if(n > 0)
        return Math.ceil(n/5.0) * 5;
    else if( n < 0)
        return Math.floor(n/5.0) * 5;
    else
        return 5;
  };

  $scope.reportEvent = function(event)  {
    $timeout(function() {
      $scope.data['posX'] = -1 * ((event.gesture.center.pageX * XYMult) - XdiffDist);
      $scope.data['posY'] = -1 * ((event.gesture.center.pageY * XYMult) - YdiffDist);

      posKeyX = $scope.closestMultiple(($scope.data['posY'] * -1) * XYMultPos) + XaddDist;
      posKeyY = $scope.closestMultiple(($scope.data['posX'] * -1) * XYMultPos) + YaddDist;
    

      //Detect everytime that I change in the key that I am pressing on 
      var pressedID = $rootScope.gridID[posKeyX + 'x' + posKeyY];
      if(pressingID !== pressedID) {
        if(!isNaN(pressedID)) {
          $rootScope.removeTriangle(pressingID);
          pressingID = pressedID;
          $rootScope.drawTriangle(pressedID);
        }
      }

      if (event.type == "drag" || event.type == "touch") {
        $scope.display = "none";
        $rootScope.hideInput();
      } else if(event.type == "release") {
        $scope.display = "block";
        $rootScope.displayInput();
        if(!isNaN(pressedID)) {
          $rootScope.writeChar(pressedID);
        } else {
          $rootScope.writeChar(pressingID);
        }
      }
    })
  }
}])

.directive('detectGestures', function($ionicGesture) {
  return {
    restrict :  'A',

    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;

      $ionicGesture.on('drag', scope.reportEvent, elem);
      $ionicGesture.on('touch', scope.reportEvent, elem);
      $ionicGesture.on('release', scope.reportEvent, elem);      

    }
  }
})
