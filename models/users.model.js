const mongoose = require('mongoose');

const account = new mongoose.Schema({
  amount: {
    type: Number,
    required: " amount(in paise) is required"
  },
  type: {
    type: String,
    enum: ['Savings', 'Current', 'BasicSavings'],
    required: " type of account required "
  }
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: " username is required"
  },
  password: {
    type: String,
    required: " password is required"
  },
  address: {
    type: String,
    required: " address is required"
  },
  accounts: {
    type: [account],
    required: " AccountId is required"
  },
  phone: {
    type: String,
    unique: true,
    required: "Phone number is required"
  }
});


mongoose.model('users', userSchema);
