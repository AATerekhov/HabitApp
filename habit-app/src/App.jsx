import { Routes, Route } from "react-router-dom";
import './App.css'
import HamePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <>
      <NavbarComponent />      
      <Routes>
        <Route path="/" element={<HamePage />} />
        <Route path="home" element={<HamePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
