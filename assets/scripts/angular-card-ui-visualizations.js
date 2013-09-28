var directives = angular.module('card-ui-visualizations', []);

directives.directive('cardBlock', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'addClickCallback': '&',
      'addCount': '=?',
      'rowFill': '=?',
      'rowSize': '=?',
      'stack': '=?',
      'stackCardOffset': '=?',
      'stackDescend': '=?',
      'dataSet': '&set'
    },
    transclude: false,
    templateUrl: 'partials/card-block-directive.html',
    link: function (scope, element, attributes) {
      _.defaults(
        scope,
        {
          'addClickCallback': _.identity,
          'addCount': 1,
          'rowSize': 10,
          'stack': false,
          'stackCardOffset': 0,
          'stackDescend': false
        }
      );
    }
  };
});
directives.directive('cardRing', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'addClickCallback': '&',
      'addCount': '=?',
      'clockwise': '=?',
      'ringFill': '=?',
      'ringSize': '=?',
      'dataSet': '&set'
    },
    transclude: false,
    templateUrl: 'partials/card-ring-directive.html',
    link: function (scope, element, attributes) {
      _.defaults(
        scope,
        {
          'addClickCallback': _.identity,
          'addCount': 1,
          'clockwise': false,
          'ringFill': false,
          'ringSize': 0
        }
      );
    }
  };
});