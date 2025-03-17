import { useState } from "react";
import { login } from "../services/authService";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import NavbarComponent from '../components/NavbarComponent';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      setMessage({ text: "Login successful!", type: "success" });
      console.log(data);
    } catch (error) {
      setMessage({ text: "Login failed. Please check your credentials.", type: "danger" });
    }
  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">
       <NavbarComponent/>
      <Card style={{ width: "25rem", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
