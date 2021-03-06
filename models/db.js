const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGOCREDS, {
  useNewUrlParser: true
}, (err) => {
  if (!err) {
    console.log("Connection to db successful");
  } else {
    console.log("DB error : " + err);
  }
});

mongoose.connection.on('error', err => {
  console.log("error at mongodb : " + err);
})