angular.module('keywatch.keyboard', ['ionic'])

.factory('Keyboard', ['$window', function($window, $scope, $rootScope, $timeout) {
  return  {
    write: function(valChars) {
      var curVal = document.getElementById("txtKB").value;
      var inpuText = document.getElementById("txtKB").setAttribute('value', curVal + valChars);
    },
    displayInput: function(valChars) {
      var curVal = document.getElementById("txtKB").style.display = "block";
    },
    hideInput: function(valChars) {
      var curVal = document.getElementById("txtKB").style.display = "none";
    }
  }
}])

