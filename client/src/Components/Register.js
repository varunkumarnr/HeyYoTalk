import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
import logo from "../images/logo.png";
import "../Styles/Auth.css";
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { username, email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.PreventDefault();
    register({ username, email, password });
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard'></Redirect>;
  }
  return (
    <div className='Auth-Form'>
      <div className='AuthFormLogo'>
        <Link to='/' className='login-logo'>
          <div className='HYT-logo-wrapper'>
            <img src={logo} alt='logo' />
            <div className='HYT-logo-text'>
              <span className='logo-p1'>Hey</span>Yo
              <span className='logo-p2'>Talk</span>
            </div>
          </div>
        </Link>
        <form className='login-form bounceInDown' onSubmit={e => onSubmit(e)}>
          <h2>Welcome to HeyYoTalk</h2>
          <p>Create an account</p>
          <div className='form-group'>
            <div id='username-label'>Username &nbsp;</div>
            <input
              type='text'
              name='username'
              value={username}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <div id='email-label'>Email &nbsp;</div>
            <input
              type='text'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <div id='password-label'>Password &nbsp;</div>
            <input
              type='password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <input
            type='submit'
            className='authForm-btn'
            value='Register'
          ></input>
        </form>
        <p className='Auth-Redirect'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
