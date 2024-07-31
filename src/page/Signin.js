import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { postLogin } from '../redux/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

const SignIn = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const form = useRef()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();

    const userInfo = {
      email: form.current[0].value,
      password: form.current[1].value
    }

    postLogin(userInfo)
      .then(data => {
        if (data.body) {
          dispatch(setToken(data.body.token))
          navigate('/user')
        } else {
          setError(data.message)
        }
      }).catch(error => setError(error.message || error))

  };

  return (

    <main className="bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form id="signInForm" ref={form} onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
        <p>{error}</p>
      </section>
    </main>

  );
};

export default SignIn;
