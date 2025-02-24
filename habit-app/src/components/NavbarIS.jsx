import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
  
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="home">Otus</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="rooms">Rooms</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
          <Nav.Link href="diaries">Diaries</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavbarComponent;