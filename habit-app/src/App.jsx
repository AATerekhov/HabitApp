//import Navbar from './components/NavbarIS';
import React, { useEffect } from 'react';
import {  Route, Routes } from 'react-router-dom'
import SigninOidc from './pages/signin-oidc'
import SignoutOidc from './pages/signout-oidc'
import Home from './pages/home'
import Login from './pages/login'
import { Provider } from 'react-redux';
import store from './store';
import userManager, { loadUserFromStorage } from './services/userService'
import AuthProvider from './utils/authProvider'
import NotFound from "./components/NotFound";
import ProtectedRoute from './utils/protectedRoute'
import './App.css'
import Navbar from './components/NavbarIS';

function App() {
  
  useEffect(() => {
    // fetch current user from cookies
    loadUserFromStorage(store)
  }, [])

  return (    
  <AuthProvider userManager={userManager} store={store}> 
    <Provider store={store}>  
        <Navbar /> 
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signout-oidc" element={<SignoutOidc />} />
            <Route path="/signin-oidc" element={<SigninOidc />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>          
            } />
          </Routes>  
      </Provider>
    </AuthProvider>
  )
}

export default App
