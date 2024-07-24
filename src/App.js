import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './page/Home';
import SignIn from './page/Signin';
import UserPage from './page/User';
import Navbar from './component/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App