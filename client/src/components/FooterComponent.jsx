import React from "react";
import { Container } from "react-bootstrap";

export default function FooterComponent() {
  return (
    <footer className="bg-dark text-light text-center py-3 fixed-bottom">
      <Container>
        <p className="mb-0">© {new Date().getFullYear()} ChatApp. All rights reserved.</p>
      </Container>
    </footer>
  );
}
