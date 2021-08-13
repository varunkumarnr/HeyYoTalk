import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../Components/Alert";
import { setAlert } from "../actions/alert";
import "../Styles/Auth.css";
import PropTypes from "prop-types";
import logo from "../images/logo.png";
import { login } from "../actions/auth";
const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    console.log(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/@me'></Redirect>;
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
            <h2>Welcome Back!</h2>
            <p className='login-subtitle'>We missed you</p>
            <Alert />
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
            <div className='forgot-password'>
              <a href='https://www.americanexpress.com/en-us/business/trends-and-insights/articles/7-tricks-to-help-you-remember-anything/'>
                Forgot password?
              </a>
            </div>
            <input type='submit' className='authForm-btn' value='Login'></input>
            <p className='Auth-Redirect'>
              Don't have an account?{" "}
              <Link to='/register'>Create new account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, login })(Login);
