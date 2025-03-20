import { useState, useEffect } from "react";
import { login } from "../services/authService";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { HubConnectionBuilder } from "@microsoft/signalr";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      setMessage({ text: "Login successful!", type: "success" });

      dispatch(loginSuccess({ user: { username: data.username }, token: data.token }));
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.username));

      // Establish SignalR connection
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chatHub")
        .withAutomaticReconnect()
        .build();

      await newConnection.start();
      console.log("Connected to SignalR");
      await newConnection.invoke("UserConnected", data.username);
      setConnection(newConnection);
     console.log("database status changed");
      navigate("/chat");
    } catch (error) {
      setMessage({ text: "Login failed. Please check your credentials.", type: "danger" });
    }
  };

  return (
    <Container className="  d-flex justify-content-center align-items-center vh-100">
      <NavbarComponent />
      <Card className=" bg-info"style={{ width: "25rem", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
           
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
              
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Login</Button>
          </Form>
        </Card.Body>
      </Card>
      <FooterComponent />
    </Container>
  );
}
