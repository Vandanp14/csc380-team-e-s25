// src/pages/Tracker.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BusMap from '../components/BusMap';
import Navbar from '../components/Navbar';

const TrackerWrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  text-align: center;
  color: #002B5C;
`;

const SelectWrapper = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const Dropdown = styled.select`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  color: #333;
`;

function Tracker() {
  const [routeData, setRouteData] = useState({});
  const [selectedRoute, setSelectedRoute] = useState('');
  const [stops, setStops] = useState([]);

  useEffect(() => {
    fetch('/routes_stops.json')
      .then(res => res.json())
      .then(data => setRouteData(data))
      .catch(err => console.error('Failed to load route data:', err));
  }, []);

  const handleRouteChange = (e) => {
    const route = e.target.value;
    setSelectedRoute(route);
    setStops(routeData[route] || []);
  };

  return (
    <>
      <Navbar />
      <TrackerWrapper>
        <Header>🚌 Live Bus Tracker</Header>
        <SelectWrapper>
          <label htmlFor="routeSelect">Choose a route: </label>
          <Dropdown id="routeSelect" value={selectedRoute} onChange={handleRouteChange}>
            <option value="">-- Select a Route --</option>
            {Object.keys(routeData).map(route => (
              <option key={route} value={route}>{route}</option>
            ))}
          </Dropdown>
        </SelectWrapper>
        <BusMap buses={stops} />
      </TrackerWrapper>
    </>
  );
}

export default Tracker;
