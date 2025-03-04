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
import RoomsDetail from './pages/roomsDetail';
import Confirmations from './pages/confirmations';
import Administration from './pages/administration';
import RoomsAdmin from './pages/roomsAdmin';
import AdminHabits from './pages/adminHabits';
import AdminRewords from './pages/adminRewords';


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
            <ProtectedRoute>  
              <Suspense fallback={<div>Загрузка...</div>}>
                <LazyLoadedComponent />
              </Suspense>
            </ProtectedRoute> } >            
              <Route index element={<Administration />} />
              <Route path="confirmations" element={<Confirmations />} />
            </Route>            
          <Route path="/rooms/:id" element={<RoomsAdmin />}>          
              <Route index element={<RoomsDetail />} />
              <Route path="rewords" element={<AdminRewords />} />
              <Route path="habits" element={<AdminHabits />} />
          </Route>
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
