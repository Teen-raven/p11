import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import argentBankLogo from '../assets/argentBankLogo.webp';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../redux/authSlice'; 

const Navbar = () => {
  const user = useSelector(selectUser); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token'); 
    dispatch(setUser(null)); 
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



