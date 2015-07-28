angular.module('keywatch.directives', ['ionic'])

.controller('MyGestures', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
  
  $timeout(function() {
    console.log($rootScope.gridID);
  })

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

  $scope.reportEvent = function(event)  {
    console.log('Reporting : ' + event.type);

    $timeout(function() {
      $scope.data['posX'] = -1 * ((event.gesture.center.pageX * 2.4) - 70);
      $scope.data['posY'] = -1 * ((event.gesture.center.pageY * 2.4) - 300);
    })

    var posKeyX = -1 * $scope.closestMultiple($scope.data['posX']);
    var posKeyY = -1 * $scope.closestMultiple($scope.data['posY']);

    $timeout(function() {
      console.log($rootScope.gridID[posKeyX + 'x' + posKeyY]);
      if(isNaN($rootScope.gridID[posKeyX + 'x' + posKeyY])) {
        document.getElementById('output').innerHTML += "<div style='position:absolute;top:"+ posKeyY +"px;left:"+posKeyX+"px;'>.</div>";
      }
    })

    //console.log($scope.gridID[posKeyX + 'x' + posKeyY]);




    if (event.type == "drag" || event.type == "touch") {
      $scope.display = "none";
    } else if(event.type == "release") {
      $scope.display = "block";
      //alert('You clicked X: ' + $scope.data['posX'] + 'and Y ' + $scope.data['posY'] );
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
