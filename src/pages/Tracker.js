// src/pages/Tracker.js
import React, { useContext } from 'react';
import TripContext from '../TripContext';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import NextBusCard from '../components/NextBusCard';
import styled from 'styled-components';

const Header = styled.h2`
  text-align: center;
  margin: 1rem 0;
  color: #002B5C;
`;

function Tracker() {
  const { trip } = useContext(TripContext);
  const { route, direction, stop } = trip;

  return (
    <div>
      <Navbar />
      <FilterBar />
      <Header>
        Tracking: {route ? route : 'N/A'} — {direction ? direction : 'N/A'} to {stop ? stop : 'N/A'}
      </Header>
      {/* Render NextBusCard with dummy or real data */}
      <NextBusCard
        route={route}
        direction={direction}
        stop={stop}
        nextArrivals={['3:09 PM', '3:29 PM', '3:49 PM']} // dummy array; replace later with real data
      />
      {/* Here you would add components for the live map or additional info */}
    </div>
  );
}

export default Tracker;
