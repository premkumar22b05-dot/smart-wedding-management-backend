const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("=================================");
    console.log(" MongoDB Atlas Connected");
    console.log("=================================");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;