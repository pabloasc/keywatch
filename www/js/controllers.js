angular.module('keywatch.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('startKeyboard', function($rootScope, $scope, $window, Draw, Keyboard, $timeout) {
  //Draw KeyWatch
  $rootScope.gridID = [];
  $timeout(function() {
    Draw.initKeyboard($window, $scope, $timeout);
  })

  $rootScope.removeTriangle = function(n) {
    $timeout(function() {
      var Val = $scope.triangles[n];
      Draw.singleTriangle(Val.p1X, Val.p1Y, Val.p2X, Val.p2Y, Val.p3X, Val.p3Y, Val.idP, Val.char, Val.w, false);
    })
  }

  $rootScope.drawTriangle = function(n) {
    $timeout(function() {
      var Val = $scope.triangles[n];
      Draw.singleTriangle(Val.p1X, Val.p1Y, Val.p2X, Val.p2Y, Val.p3X, Val.p3Y, Val.idP, Val.char, Val.w, true);
    })
  }

  $rootScope.displayInput = function(n) {
    $timeout(function() {
      Keyboard.displayInput();
    })
  }

  $rootScope.writeChar = function(n) {
    $timeout(function() {
      Keyboard.write($scope.triangles[n].char);
    })
  }

  $rootScope.writeUpperChar = function(n) {
    $timeout(function() {
      Keyboard.write($scope.triangles[n].char.toUpperCase());
    })
  }

  $rootScope.hideInput = function(n) {
    $timeout(function() {
      Keyboard.hideInput();
    })
  }

  
  
});
