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

const NextBusCard = ({ route, direction, stop, nextArrival }) => {
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
      {nextArrival ? (
        <p>Next bus at {nextArrival}</p>
      ) : (
        <p>No arrival data available.</p>
      )}
    </Card>
  );
};

export default NextBusCard;
