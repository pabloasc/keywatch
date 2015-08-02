angular.module('keywatch.directives', ['ionic'])

.controller('MyGestures', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

  $scope.data = {
    posX : 0,
    posY : 0
  };

  $scope.display = "block";


  $scope.closestMultiple = function(n) {
    if(n > 0)
        return Math.ceil(n/5.0) * 5;
    else if( n < 0)
        return Math.floor(n/5.0) * 5;
    else
        return 5;
  };

  var pressingID;

  var posKeyX = 0;
  var posKeyY = 0;

  $scope.reportEvent = function(event)  {
    //console.log('Reporting : ' + event.type);

    $timeout(function() {
      $scope.data['posX'] = -1 * ((event.gesture.center.pageX * 2.4) - 70);
      $scope.data['posY'] = -1 * ((event.gesture.center.pageY * 2.4) - 300);
    })

    $timeout(function() {
      posKeyX = $scope.closestMultiple(($scope.data['posY'] * -1) * 1.45) + 70;
      posKeyY = $scope.closestMultiple(($scope.data['posX'] * -1) * 1.5) + 10;
      
      //console.log($rootScope.gridID[posKeyX + 'x' + posKeyY]);
      /*
      if(!isNaN($rootScope.gridID[posKeyX + 'x' + posKeyY])) {
        document.getElementById('output').innerHTML += "<div style='font-size:8px;position:absolute;top:"+ $scope.closestMultipleTen(posKeyX) +"px;left:"+ $scope.closestMultipleTen(posKeyY) +"px;'>"+ $rootScope.gridID[posKeyX + 'x' + posKeyY] +"</div>";
      }
      */
      
    })

    /*
    Detect everytime that I change in the key that I am pressing on 
    */

    var pessedID = $rootScope.gridID[posKeyX + 'x' + posKeyY];

    if(pressingID !== pessedID) {
      if(!isNaN(pessedID)) {
        $rootScope.removeTriangle(pressingID);
        pressingID = pessedID;
        $rootScope.drawTriangle(pessedID);
      }
    }

    if (event.type == "drag" || event.type == "touch") {
      $scope.display = "none";
      $rootScope.hideInput();
    } else if(event.type == "release") {
      $scope.display = "block";
      $rootScope.displayInput();
      $rootScope.writeChar($rootScope.gridID[posKeyX + 'x' + posKeyY]);
    }
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
