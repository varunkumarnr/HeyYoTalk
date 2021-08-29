import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socket from "../socket/index";
import { Link, useParams } from "react-router-dom";
import { FetchMessages, sendMessage } from "../../actions/message";
import { connect } from "react-redux";
import { FetchChannelById } from "../../actions/channels";
import "../../Styles/Message.css";

const MessagesList = ({
  message: { messages },
  FetchMessages,
  sendMessage,
  auth: { user },
  FetchChannelById,
  channel: { channell, channels }
}) => {
  const [channelName, setChannelName] = useState();
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arriavalMessage, setArrivalMessage] = useState(null);
  let { guild_id } = useParams();
  let { channel_id } = useParams();
  useEffect(() => {
    FetchChannelById(guild_id, channel_id);
  }, [channel_id, FetchChannelById, guild_id]);
  // useEffect(()=> {
  //   socket.on("getMessage")
  // },[])
  const onChange = e => {
    setMessage(e.target.value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    user &&
      (await socket.emit("sendmessage", {
        senderId: user._id,
        text: message,
        channelId: channel_id
      }));

    await socket.emit("getmessages", {
      channelId: channel_id
    });
    // await socket.on("messages", data => {
    //   setAllMessages(data);
    //   console.log(data);
    // });
    setMessage("");
  };
  useEffect(() => {
    socket.on("messages", data => {
      setAllMessages(data);
      // console.log(data);
    });
  }, [setAllMessages]);
  useEffect(() => {
    FetchMessages(guild_id, channel_id).then(data => {
      setAllMessages(data);
      // console.log(data);
    });
  }, [guild_id, channel_id, FetchMessages]);
  return (
    <div className='channel-messages-index'>
      <div className='channel-messages-index-header'>
        <div className='channel-messages-index-header-left-right'>
          <div className='channel-messages-index-header-left'>
            <span className='channel-messages-index-header-left-hashtag'>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <path
                  fill='#8e9291'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'
                ></path>
              </svg>
            </span>
            <span className='channel-message-index-header-left-channel-name'>
              {channell && channell.channel_name}
            </span>
          </div>
        </div>
        <span></span>
      </div>
      <div className='channel-messages-index-main'>
        <div className='welcome-to-channel-container'>
          <img
            className='welcome-to-channel-img-left'
            src='https://diskord-pro.s3.amazonaws.com/channel-welcome-left.png'
            alt=''
          />
          <div className='welcome-to-channel'>
            Welcome to {channell && channell.channel_name} channel.
          </div>
          <img
            className='welcome-to-channel-img-right'
            src='https://diskord-pro.s3.amazonaws.com/channel-welcome-right.png'
            alt=''
          />
        </div>
        {allMessages.length > 0 ? (
          allMessages.map((msg, idx) => {
            return (
              <div className='message-index-width' key={idx}>
                <div className='message-width-container'>
                  <div className='message-container'>
                    <div className='message-profile-picture'>
                      <img
                        src={msg.sender.profle_picture}
                        alt='pfp'
                        className='placeholder-logo'
                      />
                    </div>
                    <div className='message-data'>
                      <div className='message-header'>
                        <span className='message-author'>
                          {msg.sender.username}
                        </span>
                        <span className='recent-date'>
                          {new Date(Date.parse(msg.TimeStamp))
                            .toString()
                            .split(" ")
                            .splice(0, 5)
                            .join(" ")}
                        </span>
                      </div>
                      <div className='message-body '>{msg.text}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='messages-placeholder '></div>
        )}
      </div>
      <div className='channel-messages-index-footer'>
        <form
          className='channel-message-input-form'
          onSubmit={e => onSubmit(e)}
        >
          {/* <label className='message-image-upload'>
            +
            <input type='file' />
          </label> */}
          <input
            className='channel-message-input'
            name='text'
            value={message}
            onChange={e => onChange(e)}
            type='text'
            placeholder={`Message #${channell && channell.channel_name}`}
          />
        </form>
      </div>
    </div>
  );
};

MessagesList.propTypes = {
  FetchMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  FetchChannelById: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  channel: PropTypes.object
};
const mapStateToProps = state => ({
  message: state.message,
  channel: state.channel,
  auth: state.auth
});
export default connect(mapStateToProps, {
  FetchMessages,
  FetchChannelById,
  sendMessage
})(MessagesList);
