const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
userRoute = require("./routes/User");
const serverRoute = require("./routes/Server");
const channelRoute = require("./routes/Channel");
const MessageRoute = require("./routes/Messages");
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
app.use("/api/server", serverRoute);
app.use("/api/server", channelRoute);
app.use("/api/server", MessageRoute);

// socket

const server = app.listen(PORT, () =>
  console.log(`the server is running at ${PORT}`)
);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "https://hey-yo-talk.vercel.app"]
  }
});
const connectedUsers = {};
io.on("connection", socket => {
  console.log("a user connected");
});
