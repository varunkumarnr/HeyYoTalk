import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, IconButton, Avatar } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import Logo from "../../images/logo.png";
import { getUserServers } from "../../actions/server";
import PropTypes from "prop-types";
import { ServerTooltip } from "../Server/ServerTooltip";
import { openModal } from "../../util/Util";
import "../../Styles/Server.css";
import ServerModal from "./ServerModal";
const ServerList = ({ getUserServers, server: { loading, guilds } }) => {
  const { serverId } = useParams();
  useEffect(() => {
    getUserServers();
  }, [getUserServers]);
  return loading || guilds === null ? (
    <p>loading</p>
  ) : (
    <div className='server-container'>
      <div className='icon messenger' data-tooltop='Direct Message'>
        <Link to='/channels/@me' className='tooltip'>
          {" "}
          <img src={Logo} alt='logo' />
          <ServerTooltip text='dm channel' />
        </Link>
      </div>
      <span className='divider'></span>
      <div className='userserverList'>
        {guilds.map(guild => {
          // const isActive = serverId?serverId === guild._id;
          // active code to be done
          return (
            <Link
              className={`gulid_list_item tooltip`}
              key={guild._id}
              to={`/channels/${guild._id}/${guild.channels[0]}`}
            >
              <img className='userServer-image' src={guild.icon} alt='server' />
              <ServerTooltip text={`open ${guild.name} server`} />
            </Link>
          );
        })}
      </div>
      <span className='divider'></span>

      <button
        onClick={() => openModal("create-guild-modal")}
        id='create_join_guild'
        className='create_join_guild special tooltip'
      >
        <p className='create-server-icon'>+</p>
        <ServerTooltip text='create or join new server' />
      </button>
    </div>
  );
};

ServerList.propTypes = {
  getUserServers: PropTypes.func.isRequired,
  server: PropTypes.object.isRequired
};
const mapStateToprops = state => ({
  server: state.server
});
export default connect(mapStateToprops, { getUserServers })(ServerList);
