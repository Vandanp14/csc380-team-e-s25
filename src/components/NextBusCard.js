// src/components/NextBusCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 1rem auto;
  text-align: center;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #004b23;
  }
`;

const NextBusCard = ({ route, direction, stop, nextArrivals }) => {
  return (
    <Card>
      <h3>Next Bus Arrival</h3>
      {route && direction && stop ? (
        <p>
          Tracking: {route} — {direction} to {stop}
        </p>
      ) : (
        <p>Please select a route, direction, and stop.</p>
      )}
      {nextArrivals && nextArrivals.length > 0 ? (
        <>
          <p>Select upcoming arrival:</p>
          <Dropdown>
            {nextArrivals.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </Dropdown>
        </>
      ) : (
        <p>No arrival data available.</p>
      )}
    </Card>
  );
};

export default NextBusCard;
