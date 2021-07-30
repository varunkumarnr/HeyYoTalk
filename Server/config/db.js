const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.DB_URL;

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
