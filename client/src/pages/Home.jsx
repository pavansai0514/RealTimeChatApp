import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
export default function Home() {
  return (
    <>
      <NavbarComponent/>
      

      {/* Page content with margin to avoid overlap */}
      <Container className="text-center mt-5 pt-5">
        <h1>Welcome to ChatApp</h1>
        <p>Connect with your friends in real-time.</p>
      </Container>
      <FooterComponent/>
    </>
  );
}
