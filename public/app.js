(function () {
  angular
    .module('WebSummit', [])
    .controller('HomeController', ['$scope', '$http', '$timeout', ($scope, $http, $timeout) => {
      $scope.startups = []
      $scope.searchValue = ''

      $scope.getStartups = getStartups

      init()

      function init () {
        $http
          .get('data/startups.json')
          .then((res) => {
            $timeout(() => $scope.startups = res.data)
          })
      }

      function getStartups () {
        return $scope.startups.filter((startup) => {
          return JSON.stringify(startup).toLowerCase().match($scope.searchValue.toLowerCase())
        })
      }
    }])
})()