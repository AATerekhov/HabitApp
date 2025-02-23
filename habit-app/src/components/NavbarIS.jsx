import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { signinRedirect, signoutRedirect } from '../services/userService';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const NavbarComponent = () => {
  const user = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    // Логика для входа
    signinRedirect();
    console.log("Login clicked");
  };

  const handleLogout = () => {
    // Логика для выхода
    signoutRedirect();
    console.log("Logout clicked");
  };

  return (    
    <Navbar bg="light" expand="lg" >
    <Container >
      <Navbar.Brand as={Link} to="/">
        <img src="/basket.png" alt="Логотип" className="navigation-logo"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="rooms">Rooms</Nav.Link>
          <Nav.Link as={Link} to="register">Register</Nav.Link>
        </Nav>
        <Nav >
          {user&& <div className='mt-3'>
              Signed in as <b>{user}</b>
            </div>}
            {!user && <button  onClick={handleLogin} className="button button-outline mt-2">Login</button>}
            {user && <button  onClick={handleLogout} className="button button-clear mt-2">Logout</button>}         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavbarComponent;