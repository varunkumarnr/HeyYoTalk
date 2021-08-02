const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
userRoute = require("./routes/user");
const PORT = process.env.PORT || 5000;
connectDB();
const corsOptions = {
  origin: ["https://hey-yo-talk.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "Delete"],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
app.use("/api/user", userRoute);
app.listen(PORT, () => console.log(`the server is running at ${PORT}`));
