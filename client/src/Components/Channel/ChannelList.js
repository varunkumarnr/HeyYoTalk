import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getServerById } from "../../actions/server";
import { FetchChannelById } from "../../actions/channels";
import { ChannelTitle, ChannelTilte } from "./ChannelTilte";
import "../../Styles/Channels.css";
import { ChannelItem } from "./ChannelItem";
const ChannelList = ({
  getServerById,
  FetchChannelById,
  server: { loading, guilds, guild },
  channel
}) => {
  let { guild_id } = useParams();
  let { channel_id } = useParams();
  const [channels, setChannels] = useState();
  const [ServerName, setServerName] = useState("server name");

  useEffect(() => {
    getServerById(guild_id);
  }, [getServerById, guild_id]);
  return loading || guilds === null || guild === null ? (
    <div className='channels-container'>
      <div className='channel-title'>
        <ChannelTilte title='DM Channels' />
      </div>
      <div className='text-channels-container'>
        <div className='text-channel-text'>TEXT CHANNELS</div>
        <div className='add-channel-icon'>+</div>
      </div>
      <div className='all-server-channels'>
        <ChannelItem />
      </div>
    </div>
  ) : (
    <div className='channels-container'>
      <div className='channel-title'>
        <ChannelTilte title={`${guild.name} server `} />
      </div>
      <div className='text-channels-container'>
        <div className='text-channel-text'>TEXT CHANNELS</div>
        <div className='add-channel-icon'>+</div>
      </div>
      <div className='all-server-channels'>
        <ChannelItem />
      </div>
    </div>
  );
};

ChannelList.propTypes = {
  getServerById: PropTypes.func.isRequired,
  FetchChannelById: PropTypes.func.isRequired,
  server: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  server: state.server,
  channel: state.channel
});
export default connect(mapStateToProps, { getServerById, FetchChannelById })(
  ChannelList
);
