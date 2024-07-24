import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import argentBankLogo from '../assets/argentBankLogo.webp';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          return response.json();
        })
        .then(data => {
          if (data.body) {
            setUser(data.body);
          } else {
            throw new Error('User data not found in response');
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error.message);
        });
    }
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setUser(null);
    navigate('/sign-in');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div id="nav-user">
        {user ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              <span id="user-fullname">{user.firstName} {user.lastName}</span>
            </Link>
            <Link className="main-nav-item" to="/sign-in" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              <span id="sign-out">Sign Out</span>
            </Link>
          </>
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
