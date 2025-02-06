// Callback.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCallback } from '../modules/authSlice';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(handleCallback())
      .unwrap()
      .then(() => {
        // Перенаправляем пользователя на главную страницу после успешного входа
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during callback:', error);
      });
  }, [dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <div>Callback processing...</div>;
}

export default Callback;