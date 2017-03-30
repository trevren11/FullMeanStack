angular.module('comment', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $scope.comments = [];
      $scope.addComment = function () {
        var date = $('#datepicker').val();
        var newcomment = { title: $scope.formContent, upvotes: 0, a: false, b: false, c: false, d: false, e: false, f: false, date: date };
        $scope.formContent = '';
        $http.post('/comments', newcomment).success(function (data) {
          $scope.comments.push(data);
        });
      };
      $scope.upvote = function (comment) {
        return $http.put('/comments/' + comment._id + '/upvote')
          .success(function (data) {
            console.log("upvote worked");
            comment.upvotes = data.upvotes;
          });
      };
      $scope.incrementUpvotes = function (comment) {
        $scope.upvote(comment);
      };
      $scope.getAll = function () {
        return $http.get('/comments').success(function (data) {
          angular.copy(data, $scope.comments);
        });
      };
      $scope.getAll();

      $scope.delete = function (comment) {
        $http.delete('/comments/' + comment._id)
          .success(function (data) {
            console.log("delete worked");
          });
        $scope.getAll();
      };
    }
  ]);
