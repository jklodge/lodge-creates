const mongoose = require("mongoose");

// const supportSchema = new mongoose.Schema({
//   user: {type: mongoose.Schema.ObjectId, ref: 'User'}
//
// });
//add a time of day for the incident
const circleSchema = new mongoose.Schema({
  // userObject: {
  user: { type: String },
  choiceObject: { type: Object },
  circleObject: { type: Object },
  orderedSegments: { type: Array },
  orderedObject: { type: Array },
  problemArray: { type: Array },
  numberOfCircles: { type: Number },
  resultsViewed: { type: Number },
  _id: { type: String },
  timeStamp: { type: String }
});

module.exports = mongoose.model("circle", circleSchema);
