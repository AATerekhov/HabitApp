// AppAuth.js v1.0
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, handleCallback, logout } from '../modules/authSlice';
import  userManager  from '../services/authConfig';


/**
 * @deprecated Sample
 */
function AppAuth() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    userManager.getUser().then((user) => {
      if (user && !user.expired) {
        dispatch(handleCallback());
      }
    });
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Welcome, {user.profile.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default AppAuth;