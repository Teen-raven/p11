// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import argentBankLogo from '../assets/argentBankLogo.webp';

const Navbar = ({ user }) => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div id="nav-user">
        {user ? (
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            <span id="user-fullname">{user.firstName} {user.lastName}</span>
          </Link>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            <span id="user-fullname">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
