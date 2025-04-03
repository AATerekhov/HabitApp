import React, { useEffect } from 'react'
import { signinRedirectCallback } from '../services/userService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import userManager from '../services/userService';
import { storeUser, storeAccessToken  } from '../reducers/userSlice';

function SigninOidc() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    async function signinAsync() {
      await userManager.signinRedirectCallback().then((user) => {
        dispatch(storeUser(user.profile.given_name));
        dispatch(storeAccessToken(user ? user.access_token: null));        
      }).catch((error) => {
        console.error(error);
      });

      navigate('/')
    }
    signinAsync()
  }, [navigate])

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default SigninOidc
