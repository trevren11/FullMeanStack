var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  title: String,
  upvotes: { type: Number, default: 0 },
  a: Boolean,
  b: Boolean,
  c: Boolean,
  d: Boolean,
  e: Boolean,
  f: Boolean,
  date: String,
});
CommentSchema.methods.upvote = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Comment', CommentSchema);
