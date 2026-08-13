require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/database/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("=================================");
    console.log(" Smart Wedding Backend Started ");
    console.log("=================================");
    console.log(`Server Running : http://localhost:${PORT}`);
  });
};

startServer();