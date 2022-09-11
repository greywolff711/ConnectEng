import React from 'react'
import { Link } from 'react-router-dom'
import {logout} from '../../actions/auth';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Navbar = ({logout,auth}) => {
  const authLinks=(
    <ul>
      <li>
        <Link onClick={logout} to="/register">
        <i className='fas fa-sign-out-alt'></i>{' '}Logout
        </Link>
      </li>
    </ul> 
  );
  const guestLinks=(
    <ul>
      <li><Link to="/profile">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
    console.log(auth.isAuthenticated);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> ConnectEng</Link>
      </h1>
      {auth.isAuthenticated?authLinks:guestLinks}
    </nav>
  )
}

Navbar.prototype={
  logout:PropTypes.func.isRequired,

}

const mapStateToProps=state=>({
  auth:state.auth,
});

export default connect(mapStateToProps,{logout})(Navbar);