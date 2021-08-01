const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
userRoute = require("./routes/user");
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json({ extended: false }));
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
app.use("/api/user", userRoute);
app.listen(PORT, () => console.log(`the server is running at ${PORT}`));
