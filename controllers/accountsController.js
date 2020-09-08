const router = require("express").Router();
const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");
const constants = require('../responses/constants');
const Users = mongoose.model("users");

router.post("/addUser", (req, res) => {

  const body = {
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    accounts: []
  }

  Users.create(body, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.json(doc);
    } else {
      res.json(err);
    }
  });

});

//> db.student.update( { "subjects" : "gkn" },{ $push: { "achieve": 95 } });
router.post("/addAccount", (req, res) => {

  if (req.body.type == "BasicSavings" && req.body.amount > constants.BASIC_LIMIT) {
    res.status(400).json({
      error: constants.EXCEED_BASIC
    })
  } else {
    const body = {
      amount: req.body.amount,
      type: req.body.type,
    }
    Users.update({
      username: req.body.username
    }, {
      $push: {
        "accounts": body
      }
    }, (err, doc) => {
      if (!err) {
        console.log(doc);
        if (doc.nModified != 0) {
          res.json(doc);
        } else {
          res.status(500).json({
            error: constants.USER_NOT_FOUND
          });
        }
      } else {
        res.json(err);
      }
    })
  }
});


module.exports = router;