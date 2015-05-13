var mongoose = require('mongoose');

var MakerMixSchema = new mongoose.Schema({
  name: String,
  pair: Boolean,
  blacklist: Boolean,
  noOfCommits: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MakerMix', MakerMixSchema);
