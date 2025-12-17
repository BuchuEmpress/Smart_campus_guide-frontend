import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WelcomeSimi from './pages/WelcomeSimi';
import Chatbot from './pages/Chatbot';
import Navigation from './pages/Navigation';
import AdminDashboard from './pages/AdminDashboard';
import ProjectAssistant from './pages/ProjectAssistant';
import ReloadPrompt from './components/ReloadPrompt';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  }

  render() {
    return (
      <Router>
        <ReloadPrompt />
        <Routes>
          <Route path="/" element={<Login onLogin={this.handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<WelcomeSimi />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/project-assistant" element={<ProjectAssistant />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
