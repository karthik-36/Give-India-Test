module.exports = {
  BAD_REQUEST: "Bad request",
  SUCCESS: "Transaction was successful",
  SAME_ACCOUNT: "Not Allowed, You are trying to send money to your own account!",
  SAME_USER: "Not Allowed, You are trying to send money to an another account owned my you.",
  USER_NOT_FOUND: "User was not found",
  INVALID_AMOUNT: "Amount should be greater than 0 Paisa.",
  INTERNAL_ERR: "Internal server error",
  OVERDRAW: "You are trying to send more money then what you have",
  EXCEED_BASIC: "Basic Savings Account is not allowed to have more then 50k Rupees",
  BASIC_LIMIT: 5000000,
  ACCOUNT_DOES_NOT_EXIST: function(acc) {
    return acc + " account does not exist"
  }
}