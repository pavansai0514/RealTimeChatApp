import { useState } from "react";
import { register } from "../services/authService";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "danger" });
      return;
    }

    try {
      const data = await register(formData);
      setMessage({ text: "Registration successful!", type: "success" });
    
    } catch (error) {
      setMessage({ text: "Registration failed. Please try again.", type: "danger" });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
        <NavbarComponent/>
      <Card style={{ width: "25rem", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <FooterComponent/>
    </Container>
   
  );
}
