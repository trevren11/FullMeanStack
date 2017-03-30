var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  a: Boolean,
  b: Boolean,
  c: Boolean,
  d: Boolean,
  e: Boolean,
  f: Boolean,
  date: String,
});
CommentSchema.methods.update = function (cb, comment) {
  this.a = comment.a;
  this.b = comment.b;
  this.c = comment.c;
  this.d = comment.d;
  this.e = comment.e;
  this.f = comment.f;
  this.save(cb);
};
mongoose.model('Comment', CommentSchema);
