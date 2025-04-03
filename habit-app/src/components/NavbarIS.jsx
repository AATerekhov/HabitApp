import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { signinRedirect, signoutRedirect } from '../services/userService';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import Broadcaster from '../pages/notifications/Broadcaster';

const NavbarComponent = () => {
 

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
          <Nav.Link as={Link} to="cards">Cards</Nav.Link>
        </Nav>
      </Navbar.Collapse>      
      <Broadcaster /> 
    </Container>
  </Navbar>
  );
};

export default NavbarComponent;