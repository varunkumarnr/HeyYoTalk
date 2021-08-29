const { ChannelMessage, EventType } = require("./models/Messages");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
userRoute = require("./routes/User");
const serverRoute = require("./routes/Server");
const channelRoute = require("./routes/Channel");
const MessageRoute = require("./routes/Messages");
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
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
    socket.on("sendmessage", async ({ senderId, text, channelId }) => {
      try {
        let newMessage = new ChannelMessage({
          sender: senderId,
          text: text,
          channelId: channelId
        });
        console.log(newMessage);
        await newMessage.save();
        console.log("done");
      } catch (err) {
        console.log(err.message, "error");
      }
    });
    socket.on("getmessages", async ({ channelId }) => {
      // console.log("get");
      try {
        let channel = await ChannelMessage.find({
          channelId: channelId
        })
          .populate(
            "sender",
            "-password -description -status -email -friend_req -friends -servers"
          )
          // .sort({ TimeStamp: -1 })
          .limit(50)
          .then(rdata => {
            io.emit("messages", rdata);
          });
      } catch (err) {
        console.log(err.message);
      }
    });
  });
});
