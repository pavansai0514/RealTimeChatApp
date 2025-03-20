import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("user"); // Check session

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Remove session
    navigate("/login"); // Redirect to login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">ChatApp</Navbar.Brand>
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline-light" className="me-2">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
