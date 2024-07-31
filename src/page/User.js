import { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectUser, setUser } from '../redux/authSlice';
import { postUser, putUsername } from '../redux/authApi';
import { useNavigate } from 'react-router-dom';
import AccountSection from '../component/Accountsection';

const UserPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    } else {
      postUser(token)
        .then(data => {
          dispatch(setUser(data.body));
        })
        .catch(error => {
          console.error('Error:', error.message);
          navigate('/sign-in');
        });
    }
  }, [token, dispatch, navigate]);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    putUsername(token, newUsername)
      .then(data => {
        dispatch(setUser(data.body));
        setModalVisible(false);
        setNewUsername('');
      })
      .catch(error => {
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
        <AccountSection 
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
          accountType="checking"
        />
        <AccountSection 
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          accountType="savings"
        />
        <AccountSection 
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
          accountType="credit-card"
        />
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
