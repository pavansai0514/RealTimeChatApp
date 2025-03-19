import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import Home from './pages/Home';
import Chat from './pages/Chat'
import Profile from './components/Profile';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/status" element={<UserStatus />} />
        <Route path="/logout" element={<Logout />} />
        
      </Routes>
    </Router>
  )
}

export default App
