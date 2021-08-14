import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../Components/Alert";
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
    e.preventDefault();
    register({ username, email, password });
    // console.log(username, email, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/channels/@me'></Redirect>;
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
      </div>

      <div className='login-container'>
        <form className='login-form bounceInDown' onSubmit={e => onSubmit(e)}>
          <div className='login-form-inner'>
            <h2>Welcome to HeyYoTalk</h2>
            <p className='login-subtitle'>Create an account</p>
            <Alert />
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
            <p className='Auth-Redirect'>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </div>
        </form>
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
