import React, { useState, useEffect } from "react";
import "../../Styles/Members.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getServerById } from "../../actions/server";
import Owner from "../../images/owner.svg";
const Members = ({ getServerById, server: { guild, loading } }) => {
  const [serverOwner, setServerOwner] = useState("");
  useEffect(() => {
    setServerOwner(guild);
  }, [setServerOwner, guild]);
  return loading || guild === null || guild.owner === null ? (
    <p>loading</p>
  ) : (
    <div className='member-container'>
      {guild.owner && (
        <div className='owner-container'>
          <div className='owner-container-title'> owner </div>

          <div className='owner-container-data'>
            <div className='owner-data-pfp'>
              <img src={guild.owner.profle_picture} alt='' />
            </div>
            <div className='owner-data-name'>
              {guild.owner.username}
              <span className='owner-logo-container'>
                <img className='owner-logo' src={Owner} alt='' />
              </span>{" "}
            </div>
          </div>
        </div>
      )}
      {guild.admin && <div> admins </div>}
    </div>
  );
};
Members.propTypes = {
  server: PropTypes.object.isRequired,
  getServerById: PropTypes.func.isRequired
};
const mapStateToprops = state => ({
  server: state.server
});
export default connect(mapStateToprops, { getServerById })(Members);
