//import Navbar from './components/NavbarIS';
import React, { useEffect } from 'react';
import {  Route, Routes } from 'react-router-dom'
import SigninOidc from './pages/signin-oidc'
import SignoutOidc from './pages/signout-oidc'
import Home from './pages/home'
import Login from './pages/login'
import { Provider } from 'react-redux';
import store from './app/store';
import userManager, { loadUserFromStorage } from './services/userService'
import AuthProvider from './utils/authProvider'
import NotFound from "./components/NotFound";
import ProtectedRoute from './utils/protectedRoute'
import DiaryList from './components/DiaryList';
import DiaryDetails from './components/DiaryDetails';
import './App.css'
import Navbar from './components/NavbarIS';

function App() {
  
  useEffect(() => {
    //fetch current user from cookies
    loadUserFromStorage(store)
  }, [])

  return (    
  
    <Provider store={store}>  
      <AuthProvider userManager={userManager}>      
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signout-oidc" element={<SignoutOidc />} />
          <Route path="/signin-oidc" element={<SigninOidc />} />
          <Route path="/diaries" element={<DiaryList />} />
          <Route path="/diary/:id" element={<DiaryDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>          
          } />
        </Routes>       
      </AuthProvider>  
    </Provider>       
  )
}

export default App
