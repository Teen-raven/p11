export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'SET_USER', payload: { user: data.user, token: data.token } });
      localStorage.setItem('token', data.token); 
    } else {
      console.error(data.message); 
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('token'); 
};

export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'SET_USER', payload: { user: data.body } });
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
