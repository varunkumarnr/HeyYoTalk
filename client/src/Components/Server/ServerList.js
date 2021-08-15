import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, IconButton, Avatar } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import Logo from "../../images/logo.png";
import { getUserServers } from "../../actions/server";
import PropTypes from "prop-types";
import "../../Styles/Server.css";
const ServerList = ({ getUserServers, server: { loading, guilds } }) => {
  const match = useParams;
  useEffect(() => {
    getUserServers();
  }, [getUserServers]);
  return loading || guilds === null ? (
    <p>loading</p>
  ) : (
    <div className='server-container'>
      <div className='icon messenger' data-tooltop='Direct Message'>
        <Link to='/channels/@me'>
          {" "}
          <img src={Logo} alt='logo' />
        </Link>
      </div>
      <span className='divider'></span>
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
