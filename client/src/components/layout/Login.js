import React, { Fragment,useState } from 'react'
import {Link,Navigate} from 'react-router-dom';
import { login } from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({login,isAuthenticated}) => {
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  });

  const {email,password}=formData;

  const onchange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});

  const onsubmit=(e)=>{
    e.preventDefault();
    login(email,password);
  }

  //Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
      <form class="form" onSubmit={onsubmit}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={e=>onchange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e=>onchange(e)}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps=state=>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);