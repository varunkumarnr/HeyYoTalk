import io from "socket.io-client";
let socket = io("https://heyyotalk.herokuapp.com/");

export default socket;
