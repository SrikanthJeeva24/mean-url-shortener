require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
