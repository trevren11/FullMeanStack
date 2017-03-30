var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

process.title = "nodeHealth3007"; // Set the process id

router.get('/comments', function (req, res, next) {
  Comment.find(function (err, comments) {
    if (err) { return next(err); }
    res.json(comments);
  });
});

router.post('/comments', function (req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function (err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.param('comment', function (req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

router.get('/comments/:comment', function (req, res) {
  res.json(req.comment);
});

router.post('/comments/:comment/update', function (req, res, next) {
  // I only really needed to replace the single characters from 'realThing' but whatevs
  var realThing = res.req.body;
  req.comment.a = realThing.a;
  req.comment.b = realThing.b;
  req.comment.c = realThing.c;
  req.comment.d = realThing.d;
  req.comment.e = realThing.e;
  req.comment.f = realThing.f;
  req.comment.update(function (err, comment) {
    if (err) {
      console.log("Error");
      console.log(err);
      return next(err);
    }
    console.log("Worked");
    res.json(comment);
  }, req.comment); // Pass comment in to update from
});

router.delete('/comments/:comment', function (req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.json(req.comment);
});
module.exports = router;
