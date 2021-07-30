const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => console.log(`the server is runnign at ${PORT}`));
