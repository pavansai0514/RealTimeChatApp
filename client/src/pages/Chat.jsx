import React, { useState, useEffect } from "react";
import { connectWebSocket, sendPrivateMessage } from '../services/webSocketService';
import { useSelector } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import UserStatus from "../components/UserStatus";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   console.log('Redux state after page reload:', user.username);
  // }, [user]);


  const handleLogout = async () => {
    if (messages.length > 0) {
      const formattedMessages = messages.map((msg) => ({
        sender: username,
        receiver: msg.receiver, // Ensure receiver is included
        content: msg.content,
        timestamp: new Date().toISOString(),
      }));
  
      try {
        await fetch("http://localhost:5000/api/messages/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: formattedMessages }),
        });
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    }
  
    setMessages([]); // Clear local messages
   // dispatch(logoutUser()); // Logout action
  };

  
  useEffect(() => {
    if (user) {
      setUsername(user.username); // Automatically set username from Redux user
      console.log(user.username);
    }else{
      const sessionUser = sessionStorage.getItem("user")?.replace(/"/g, "").trim();
      setUsername(sessionUser);
    }
  }, [user]); // This runs whenever the `user` from Redux changes

  useEffect(() => {
    if (username && !connected) {
      connectWebSocket(username, (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      setConnected(true);
    }
  }, [username, connected]);

  const handleSend = () => {
    if (receiver && message) {
      sendPrivateMessage(username,message)
      sendPrivateMessage(receiver, message);
      setMessage("");
    }
  };

  return (
    <div>
      {/* Navbar Component */}
      <NavbarComponent />
   <div className="d-flex flex-row justify-content-start align-items-start mt-5 gap-5">
   <div className="me-5">
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "600px" }}>
        <Card className="w-100 bg-info">
          <Card.Body>
            <h2 className="text-center mb-4">Hello {username}</h2>

            {!connected ? (
              <div>
                <InputGroup className="mb-3">
                  <FormControl
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <Button variant="primary" block="true" onClick={() => setConnected(true)}>Join Chat</Button>
              </div>
            ) : (
              <div>
                {/* // <h3 className="text-center">Welcome, {user}!</h3> */}

                {/* Receiver Input */}
                <InputGroup className="mb-3">
                  <FormControl
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Receiver username"
                    aria-label="Receiver username"
                  />
                </InputGroup>

                {/* Message Input */}
                <InputGroup className="mb-3">
                  <FormControl
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a private message..."
                    aria-label="Private message"
                  />
                </InputGroup>

                <Button variant="success" block="true" onClick={handleSend}>Send</Button>

                {/* Messages */}
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Messages</h5>
                    <ListGroup className="mt-2 " >
                      {messages.map((msg, index) => (
                        <ListGroup.Item  key={index}>
                          {msg}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
      </div>
      <div className="">
<UserStatus/>
</div>
</div> 
<button onClick={handleLogout} className="">
          Update
        </button>

      {/* Footer Component */}

      <FooterComponent />
    </div>
  );
};

export default Chat;
