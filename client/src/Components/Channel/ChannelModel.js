import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Modal } from "../Server/Modal";
import { createChannel } from "../../actions/channels";
import { closeModal } from "../../util/Util";
import Alert from "../Alert";
import "../../Styles/ServerModal.css";

const ChannelModel = ({ channel, guild, alert, createChannel }) => {
  let { guild_id } = useParams();
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  //   const [type, setType] = useState("null");
  const onSubmit = async e => {
    e.preventDefault();
    setState("loading");
    let data;
    data = await createChannel(name, guild_id);
    console.log(data);
    if (data._id) {
      closeModal("create-channel-model");
      setState(null);
      return <Redirect to={`channels/${guild_id}/${data._id}`} />;
    } else {
      setState("error");
    }
  };
  return (
    <Modal id='create-channel-model' title='create a channel'>
      <div className='modal_body'>
        <Alert />
        <form onSubmit={onSubmit} id='join_guild_form'>
          <div className='form_group'>
            <label htmlFor='name'>Channel Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type='text'
              className='form_input'
            />
          </div>
        </form>
      </div>
      <div style={{ justifyContent: "space-between" }} className='modal_footer'>
        <button
          disabled={state === "loading"}
          form='join_guild_form'
          type='submit'
          className='btn blue'
        >
          {state === "loading" ? <p>loading</p> : "Create Channel"}
        </button>
      </div>
    </Modal>
  );
};

ChannelModel.propTypes = {
  createChannel: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  alert: state.auth.alert,
  channel: state.server.channel,
  guild: state.server.guild
});
export default connect(mapStateToProps, { createChannel })(ChannelModel);
