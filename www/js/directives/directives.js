angular.module('keywatch.directives', ['ionic'])

.controller('MyGestures', function($scope, $timeout) {
  
  $scope.data = {
    dragX : 0,
    dragY : 0,
    swiperight: 0,
    swipeleft: 0,
    tap : 0,
    doubletap : 0
  };

  $scope.reportEvent = function(event)  {
    console.log('Reporting : ' + event.type);
    
    $timeout(function() {
      $scope.data[event.type + 'X' ] = (event.gesture.center.pageX * 4) - 600;
      $scope.data[event.type + 'Y' ] = (event.gesture.center.pageY * 4) - 600;
    })
  }
})

.directive('detectGestures', function($ionicGesture) {
  return {
    restrict :  'A',

    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;

      switch(gestureType) {
        case 'drag':
          $ionicGesture.on('drag', scope.reportEvent, elem);
          break;
        case 'swiperight':
          $ionicGesture.on('swiperight', scope.reportEvent, elem);
          break;
        case 'swipeleft':
          $ionicGesture.on('swipeleft', scope.reportEvent, elem);
          break;
        case 'doubletap':
          $ionicGesture.on('doubletap', scope.reportEvent, elem);
          break;
        case 'tap':
          $ionicGesture.on('tap', scope.reportEvent, elem);
          break;
      }

    }
  }
})