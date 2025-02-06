import { Routes, Route } from "react-router-dom";
import './App.css'
import HamePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import UserPage from "./components/UserPage";
import Navbar from './components/NavbarIS';
import { Callback } from './components/Callback';

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HamePage />} />
        <Route path="callback" element={<Callback />} />
        <Route path="home" element={<HamePage />} />
        <Route path="register" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
        {/* Добавление защищенных путей. */}
        {/* <Route path="/protected" element={
          <ProtectedRoute>
            <ProtectedComponent />
          </ProtectedRoute>          
        } /> */}
      </Routes>
    </>
  )
}

export default App
