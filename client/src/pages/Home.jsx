import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Fixed navigation bar at the top */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#">ChatApp</Navbar.Brand>
          <Nav className="ms-auto">
            <Link to="/login">
              <Button variant="outline-light" className="me-2">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Page content with margin to avoid overlap */}
      <Container className="text-center mt-5 pt-5">
        <h1>Welcome to ChatApp</h1>
        <p>Connect with your friends in real-time.</p>
      </Container>
    </>
  );
}
