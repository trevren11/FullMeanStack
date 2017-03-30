angular.module('comment', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $scope.comments = [];
      $scope.addComment = function () {
        var date = $('#datepicker').val();
        var newcomment = {
          a: $('#optA').is(':checked'),
          b: $('#optB').is(':checked'),
          c: $('#optC').is(':checked'),
          d: $('#optD').is(':checked'),
          e: $('#optE').is(':checked'),
          f: $('#optF').is(':checked'),
          date: date
        };
        $scope.formContent = '';
        $http.post('/comments', newcomment).success(function (data) {
          $scope.comments.push(data);
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

      $scope.update = function (comment) {
        // I could try to figure out how to bind this stuff but whatever
        comment.a = document.getElementById(comment._id + "a").checked
        comment.b = document.getElementById(comment._id + "b").checked
        comment.c = document.getElementById(comment._id + "c").checked
        comment.d = document.getElementById(comment._id + "d").checked
        comment.e = document.getElementById(comment._id + "e").checked
        comment.f = document.getElementById(comment._id + "f").checked
        return $http.post('/comments/' + comment._id + '/update', comment).then(function (data) {
          console.log("update succesfull");
          comment = data;
        }, function (data) {
          console.log("error trying to update");
        });
        return $http.put('/comments/' + comment._id + '/update')
          .success(function (data) {
            console.log("update worked");
            console.log(data);
            comment = data;
          });
      };
    }
  ]);
