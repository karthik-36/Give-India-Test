const router = require("express").Router();
const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");
const constants = require('../responses/constants');
const Users = mongoose.model("users");


router.post("/transfer", async (req, res) => {

  if (req.body.fromAccountId == req.body.toAccountId) {
    res.json({
      error: constants.SAME_ACCOUNT
    });
  } else {
    let errMessage = [];
    const session = await mongoose.startSession();
    session.startTransaction();
    try { //find sender account
      let fromAccount = await Users.findOne({
        'accounts._id': req.body.fromAccountId
      }).session(session);
      if (fromAccount != null) { // check if account exists in databse.
        for (let i = 0; i < fromAccount.accounts.length; i++) {
          if (fromAccount.accounts[i]._id == req.body.fromAccountId) { //check matching index.
            if (req.body.amount > fromAccount.accounts[i].amount) { //check for overdraw.
              errMessage.push(constants.OVERDRAW);
            } else {
              fromAccount.accounts[i].amount -= req.body.amount; //deduct amount from sender.
            }
          }
          if (fromAccount.accounts[i]._id == req.body.toAccountId) { //check if owner of account is same.
            errMessage.push(constants.SAME_USER);
          }
        }

        await fromAccount.save();

      } else {
        errMessage.push(constants.ACCOUNT_DOES_NOT_EXIST(req.body.toAccountId)); // sender account not found.
      }

      //find reciver account
      let toAccount = await Users.findOne({
        'accounts._id': req.body.toAccountId
      }).session(session);

      if (toAccount != null) {
        for (let i = 0; i < toAccount.accounts.length; i++) {
          if (toAccount.accounts[i]._id == req.body.toAccountId) {
            toAccount.accounts[i].amount += req.body.amount; //add amount to reciver.
            if (toAccount.accounts[i].type == "BasicSavings" && toAccount.accounts[i].amount > constants.BASIC_LIMIT) { //check if basic limit has exceeded 50k rupees.
              errMessage.push(constants.EXCEED_BASIC);
            }
            break;
          }
        }
        await toAccount.save();
      } else {
        errMessage.push(constants.ACCOUNT_DOES_NOT_EXIST(req.body.toAccountId)); // reciver account not found.
      }

      if (errMessage.length == 0) {
        await session.commitTransaction(); // commit changes if everything is ok.
        res.json({
          message: constants.SUCCESS
        })
      } else {
        await session.abortTransaction(); // discard changes if something goes wrong.
        res.status(400).json({
          error: errMessage.join("; ")
        })
      }

    } catch (error) {
      await session.abortTransaction(); // discard changes if something goes wrong.
      res.status(500).json({
        error: constants.INTERNAL_ERR
      });
    } finally {
      session.endSession(); // end session.
    }
  }
});



module.exports = router;