import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import userManager from "../services/authConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login, handleCallback, logout } from '../modules/authSlice';

const NavbarComponent = () => {

    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);
  
    useEffect(() => {
      userManager.getUser().then((user) => {
        if (user && !user.expired) {
          dispatch(handleCallback());
        }
      });
    }, [dispatch]);
  
    const handleLogin = () => {
      dispatch(login());
    };
  
    const handleLogout = () => {
      dispatch(logout());
    };
  
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="home">Otus HomeWork</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="rooms">Rooms</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
        </Nav>
        { isLoading ? (
          <div className="d-flex align-items-center">
          <div className="navbar-text mx-1">
            Signed in as <b>{user.profile.name}</b>
          </div>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        ) : (
          <Button variant="outline-success" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavbarComponent;