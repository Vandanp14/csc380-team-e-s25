import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NextBusCard from '../components/NextBusCard';
import { useLocation } from 'react-router-dom';

const TrackerContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 2rem;
`;

const TrackingHeader = styled.h2`
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #002B5C;
  margin-top: 1rem;
`;

const Tracker = () => {
  const location = useLocation();
  const { route, direction, stop } = location.state || { route: '', direction: '', stop: '' };

  return (
    <TrackerContainer>
      <Navbar />
      <TrackingHeader>
        {route && direction && stop
          ? `Tracking: ${route} — ${direction} to ${stop}`
          : 'No route selected.'}
      </TrackingHeader>
      <NextBusCard route={route} direction={direction} stop={stop} nextArrival="3:09 PM" />
    </TrackerContainer>
  );
};

export default Tracker;
