const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
require("./models/db");
require("./models/users.model");
const transactionController = require("./controllers/transactionController");
const accountsController = require("./controllers/accountsController");
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use("/transactions", transactionController);
app.use("/accounts", accountsController);

app.listen(port, function() {
  console.log("server running at http://localhost:" + port);
});