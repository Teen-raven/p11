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

  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
    setUsername(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    putUsername(token, username)
      .then(data => {
        dispatch(setUser(data.body));
        setIsEditing(false);
        setUsername('');
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  return (
    <main className="bg-dark">
      <div className="header welcome">
        <h1>
          Welcome back<br />
          <span id="user-fullname">{user?.firstName} {user?.lastName}</span>!
        </h1>

        {!isEditing && (<button id="openModalBtn" onClick={() => setIsEditing(true)}>Edit Username</button>)}

        
        {isEditing && (
          <form
            id="changeUserData"
            onSubmit={(e) => handleEditSubmit(e)}
          >
            <div className="input-wrapper">
              <label htmlFor="username">User name:</label>
              <input type="text" id="username" onChange={handleUsernameChange} placeholder={user?.userName} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                disabled
                readOnly
                value={user?.firstName}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                disabled
                readOnly
                value={user?.lastName}
              />
            </div>
            <div className="input-wrapper">
              <button className="sign-in-button" type="submit">
                Save
              </button>
              <button
                className="sign-in-button"
                type="reset"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}


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
  );
};

export default UserPage;
