var directives = angular.module('card-ui-visualizations', []);

directives.directive('cardBlock', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'partials/card-block-directive.html',
    link: function (scope, element, attributes) {},
    controller: ['$scope', function ($scope) {}]
  };
});
directives.directive('cardRing', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'partials/card-ring-directive.html',
    link: function (scope, element, attributes) {},
    controller: ['$scope', function ($scope) {}]
  };
});