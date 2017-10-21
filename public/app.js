(function () {
  'use strict'

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
          'city',
          'country',
          'elevatorPitch',
          'industry',
          'name'
        ]
      }

      let startups
      let fuse

      $scope.startups = []
      $scope.searchValue = ''

      $scope.filter = filter
      $scope.trackOutboundLink = trackOutboundLink

      init()

      function init () {
        $http
          .get('data/startups.json.gz')
          .then((res) => {
            startups = res.data
            fuse = new Fuse(startups, fuseOptions)

            $timeout(() => { $scope.startups = startups })
          })
      }

      function filter () {
        $scope.startups = !$scope.searchValue ? startups : fuse.search($scope.searchValue)
      }

      function trackOutboundLink (url) {
        gtag('event', 'click', {
          'event_category': 'outbound',
          'event_label': url,
          'transport_type': 'beacon'
        })
      }
    }])
})()