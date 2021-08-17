import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { joinServer, createServer } from "../../actions/server";
import { Modal } from "./Modal";
import { closeModal } from "../../util/Util";
import ModalImage from "../../images/discordmodal.gif";
import "../../Styles/ServerModal.css";
const ServerModal = ({ error, guild, createServer, joinServer }) => {
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("null");
  const modified = name.replace(/^\s+|\s+$/g, " ");
  useEffect(() => {
    console.log(type);
  }, [type, name]);
  const onSubmit = async e => {
    e.preventDefault();
    setState("loading");
    let data;
    if (type === "create") {
      data = await createServer(modified);
    } else if (type === "join") {
      data = await joinServer(modified);
    }
    if (data._id) {
      closeModal("create-guild-modal");
      setState(null);
      return <Redirect to={`channels/${data._id}/${data.channels[0]}`} />;
    } else {
      setState("error");
    }
  };
  return (
    <Modal id='create-guild-modal' title='Create a server'>
      {type === "null" ? (
        <div className='server-modal-container'>
          <div className='Modal-server-img'>
            <img src={ModalImage} alt='join gif' />
          </div>

          <div className='modal_body'>
            <div className='select-type'>
              <button
                className='create-server-btn'
                onClick={() => setType("create")}
              >
                Create Server
              </button>
              <button
                className='create-server-btn'
                onClick={() => setType("join")}
              >
                Join Server
              </button>
            </div>
          </div>
          <div className='modal_footer'>
            <button
              onClick={() => closeModal("create-guild-modal")}
              type='button'
              className='cancel-btn-modal'
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {type === "create" ? (
        <>
          <div className='modal_body'>
            <form onSubmit={onSubmit} id='create_guild_form'>
              <div className='form_group'>
                <label htmlFor='name'>Server Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  className='form_input'
                />
              </div>
            </form>
          </div>
          <div
            style={{ justifyContent: "space-between" }}
            className='modal_footer'
          >
            <button className='go-back-btn' onClick={() => setType("null")}>
              Back
            </button>
            <button
              disabled={state === "loading"}
              form='create_guild_form'
              type='submit'
              className='btn blue'
            >
              {state === "loading" ? <p>loading</p> : "Create server"}
            </button>
          </div>
        </>
      ) : type === "join" ? (
        <>
          <div className='modal_body'>
            <form onSubmit={onSubmit} id='join_guild_form'>
              <div className='form_group'>
                <label htmlFor='name'>Invite code</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  className='form_input'
                />
              </div>
            </form>
          </div>
          <div
            style={{ justifyContent: "space-between" }}
            className='modal_footer'
          >
            <button className='go-back-btn' onClick={() => setType("null")}>
              Back
            </button>
            <button
              disabled={state === "loading"}
              form='join_guild_form'
              type='submit'
              className='btn blue'
            >
              {state === "loading" ? <p>loading</p> : "Join server"}
            </button>
          </div>
        </>
      ) : null}
    </Modal>
  );
};

ServerModal.propTypes = {
  // user: PropTypes.object.isRequired,
  error: PropTypes.object,
  guild: PropTypes.object,
  createServer: PropTypes.func.isRequired,
  joinServer: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  // user: state.auth.user,
  error: state.server.error,
  guild: state.server.guild
});
export default connect(mapStateToProps, { createServer, joinServer })(
  ServerModal
);
