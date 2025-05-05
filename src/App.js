// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Schedule from './pages/Schedule';
import RouteDetail from './pages/RouteDetail';
import HelpPage from './pages/HelpPage'
import styled, { createGlobalStyle } from 'styled-components';
import TripContext from './TripContext';
import './App.css';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
    color: #002B5C;
  }
`;

const AppContainer = styled.div`
  animation: fadeIn 0.3s ease-in;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

function App() {
  const [trip, setTrip] = useState({ route: '', direction: '', stop: '' });
  
  return (
    <Router>
      <TripContext.Provider value={{ trip, setTrip }}>
        <GlobalStyle />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/route/:routeId" element={<RouteDetail />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </AppContainer>
      </TripContext.Provider>
    </Router>
  );
}

export default App;
