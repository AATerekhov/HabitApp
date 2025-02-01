import React, { useState } from 'react';
import { Navbar, Nav, Container, Button  } from 'react-bootstrap';
import userService from "../services/UserService";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {

  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="home">Otus HomeWork</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="login">Login</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
        </Nav>
        <div className="navbar-text mx-1" title="Authentication Context Class Reference">
            ACR: {userService.isLoggedIn() ? userService.getTokenParsed().acr: "" }
          </div>
        { userService.isLoggedIn() ? (
          <div className="d-flex align-items-center">
          <div className="navbar-text mx-1">
            Signed in as <b>{userService.getUsername()}</b>
          </div>
          <Button variant="outline-danger" onClick={() => userService.doLogout()}>
            Logout
          </Button>
        </div>
        ) : (
          <Button variant="outline-success" onClick={() => userService.doLogin()}>
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavbarComponent;