const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_DB;

mongoose.Promise = global.Promise;

module.exports = mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("DB Successfull");
  })
  .catch((error) => console.log(error));
