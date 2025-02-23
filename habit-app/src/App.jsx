//import Navbar from './components/NavbarIS';
import React, { lazy, Suspense } from 'react';
import {  Route, Routes } from 'react-router-dom'
import SigninOidc from './pages/signin-oidc'
import SignoutOidc from './pages/signout-oidc'
import Home from './pages/home'
import Login from './pages/login'
import { Provider } from 'react-redux';
import store from './app/store';
import userManager from './services/userService'
import AuthProvider from './utils/authProvider'
import NotFound from "./components/NotFound";
import ProtectedRoute from './utils/protectedRoute'
import './App.css'
import Navbar from './components/NavbarIS';
import Footer from './components/Footer';
// import Rooms from  './pages/rooms';

const LazyLoadedComponent = lazy(() => import('./pages/rooms'));

function App() {  

  return (    
  
    <Provider store={store}>  
      <AuthProvider userManager={userManager}>      
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signout-oidc" element={<SignoutOidc />} />
          <Route path="/signin-oidc" element={<SigninOidc />} />
          <Route path="/rooms" element={      
            <Suspense fallback={<div>Загрузка...</div>}>
              <LazyLoadedComponent />
            </Suspense>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>          
          } />
        </Routes> 
        <Footer />
      </AuthProvider>  
    </Provider>       
  )
}

export default App
