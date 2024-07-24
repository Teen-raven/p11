import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'font-awesome/css/font-awesome.min.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          return response.json();
        })
        .then((data) => {
          if (data.body) {
            setUser(data.body);
          } else {
            throw new Error('User data not found in response');
          }
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUsername }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update username');
        }
        return response.json();
      })
      .then((data) => {
        if (data.body) {
          setUser(data.body);
          setModalVisible(false);
          setNewUsername('');
        } else {
          throw new Error('User data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back<br />
            <span id="user-fullname">{user?.firstName} {user?.lastName}</span>!
          </h1>
          <button id="openModalBtn" onClick={() => setModalVisible(true)}>Edit Username</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
      {modalVisible && (
        <div id="myModal" className="modal" aria-modal="true" role="dialog">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h3 className="Edittitle">Edit User Information</h3>
            <form id="editUsernameForm" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={user?.firstName} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={user?.lastName} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="newUsername">New Username</label>
                <input type="text" id="newUsername" value={newUsername} onChange={handleUsernameChange} placeholder="Enter new username" />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
