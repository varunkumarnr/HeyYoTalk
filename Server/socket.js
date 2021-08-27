let io;
let socket;
module.exports = {
  init: httpServer => {
    io = require("socket.io")(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw console.log("error");
    }
    return io;
  }
};
