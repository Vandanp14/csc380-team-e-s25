// src/pages/RouteDetail.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import TripContext from '../TripContext';
import NextBusCard from '../components/NextBusCard';

const Container = styled.div`
  padding: 1rem;
`;

const Header = styled.h2`
  text-align: center;
  margin: 1rem 0;
  color: #002B5C;
`;

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin: 1rem auto;
  max-width: 600px;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border-color: #004b23;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: #004b23;
  margin-top: 1rem;
  display: block;
`;

function RouteDetail() {
  const { routeId } = useParams();
  const { trip } = useContext(TripContext);
  const [direction, setDirection] = useState('');
  const [stop, setStop] = useState('');

  useEffect(() => {
    // Optional: Pre-fill defaults if needed from trip context
    if (trip.direction) setDirection(trip.direction);
    if (trip.stop) setStop(trip.stop);
  }, [trip]);

  return (
    <div>
      <Navbar />
      <Container>
        <Header>Route Detail for {routeId}</Header>

        <Card>
          <Label>Select Direction</Label>
          <Dropdown value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="">Select Direction</option>
            <option value="From Campus">From Campus</option>
            <option value="To Campus">To Campus</option>
            {/* Add other directions if needed */}
          </Dropdown>

          <Label>Select Stop</Label>
          <Dropdown value={stop} onChange={(e) => setStop(e.target.value)}>
            <option value="">Select Stop</option>
            <option value="SUNY Oswego Campus Center">SUNY Oswego Campus Center</option>
            <option value="Rudolph St & Centennial Dr">Rudolph St & Centennial Dr</option>
            {/* Add other stops dynamically later */}
          </Dropdown>
        </Card>

        <NextBusCard
          route={routeId}
          direction={direction}
          stop={stop}
          nextArrivals={['8:15 AM', '8:45 AM']} // still dummy, to be replaced by backend data
        />

        <Card>
          <h3>Arrival Trends</h3>
          <p>Graphical analysis coming soon…</p>
        </Card>
      </Container>
    </div>
  );
}

export default RouteDetail;
