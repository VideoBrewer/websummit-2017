(function () {
  angular
    .module('WebSummit', [])
    .controller('HomeController', ['$scope', '$http', '$timeout', ($scope, $http, $timeout) => {
      const fuseOptions = {
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          "name",
          "elevator_pitch",
          "industry",
          "city",
          "country"
        ]
      }

      let startups
      let fuse

      $scope.startups = []
      $scope.searchValue = ''

      $scope.filter = filter

      init()

      function init () {
        $http
          .get('data/startups.json')
          .then((res) => {
            startups = res.data
            fuse = new Fuse(startups, fuseOptions)

            $timeout(() => $scope.startups = startups)
          })
      }

      function filter () {
        $scope.startups = !$scope.searchValue ? startups : fuse.search($scope.searchValue)
      }
    }])
})()