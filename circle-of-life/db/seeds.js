const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Circle = require("../models/circle");

const { dbURI } = require("../config/environment");

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase()
    // Circle.create([{}])
    //   .then(circles => console.log(`${circles} circles created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
