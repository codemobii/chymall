const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const hackChymall = require("./hack");

// create express app
const app = express();

// control all cors issues
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome Learntor App Server",
  });
});

// listen for requests
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port 3000");
});

// Start hack
hackChymall();
