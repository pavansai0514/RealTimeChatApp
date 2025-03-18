// /src/pages/Login.js
import { useState } from "react";
import { login } from "../services/authService"; // Function to call API for login
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import { useNavigate } from "react-router-dom";

// Import Redux hooks
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData); // Call the login service
      setMessage({ text: "Login successful!", type: "success" });

      // Dispatch loginSuccess action to store user info in Redux
      //dispatch(loginSuccess(data.username)); // Assuming the response has a `user` object
      dispatch(loginSuccess({ user: { username: data.username }, token: data.token }));
      
      // Optionally store the token or user info in localStorage for persistence
      localStorage.setItem('token', data.token); // Store JWT Token

      navigate("/chat"); // Redirect to chat page after login
    } catch (error) {
      setMessage({ text: "Login failed. Please check your credentials.", type: "danger" }); // Error handling
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <NavbarComponent />
      <Card style={{ width: "25rem", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {/* Display message after login attempt */}
          {message && <Alert variant={message.type}>{message.text}</Alert>}
          
          {/* Login Form */}
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
      <FooterComponent />
    </Container>
  );
}
