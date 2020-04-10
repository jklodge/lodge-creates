const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.plugin(require("mongoose-unique-validator"));
mongoose.Promise = require("bluebird");
const router = require("./config/router");
const { dbURI, port } = require("./config/environment");
const cors = require("cors");
var logger = require("morgan");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use(express.json()); // to support JSON-encoded bodies

app.use("/api", router);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection =
  "mongodb+srv://jessklo:colmegjessdru@circlecluster-zb3md.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
app.get("/*", (req, res) => res.sendFile(`${__dirname}/public/index.html`));
module.exports = app;
