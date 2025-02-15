import React, { useEffect, useRef } from 'react';
// import { storeUser } from '../actions/authActions';
import { storeUser } from '../reducers/userSlice';
import { setAuthHeader } from './axiosHeaders';

import { useDispatch } from 'react-redux';

export default function AuthProvider({ userManager: manager, children }) {

  let userManager = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    userManager.current = manager

    const onUserLoaded = (user) => {    
      console.log(`user loaded: ${user}`)
      dispatch(storeUser(user))
    }

    const onUserUnloaded = () => {
      setAuthHeader(null)
      console.log(`user unloaded`)
    }

    const onAccessTokenExpiring = () => {
      console.log(`user token expiring`)
    }

    const onAccessTokenExpired = () => {
      console.log(`user token expired`)
    }

    const onUserSignedOut = () => {
      console.log(`user signed out`)
    }

    // events for user
    userManager.current.events.addUserLoaded(onUserLoaded)
    userManager.current.events.addUserUnloaded(onUserUnloaded)
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring)
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired)
    userManager.current.events.addUserSignedOut(onUserSignedOut)

    // Specify how to clean up after this effect:
    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(onAccessTokenExpiring)
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired)
      userManager.current.events.removeUserSignedOut(onUserSignedOut)
    };
  }, [manager, dispatch]);

  return (children);
}