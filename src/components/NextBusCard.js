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
const ArrivalTime = styled.div`
  font-weight: bold;
  color: #004b23;
  background-color: #e6f2ed;
  padding: 0.5rem 1rem;
  margin: 0.5rem auto;
  border-radius: 6px;
  width: fit-content;
  font-size: 1.2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const formatTime = (minutesFromNow) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutesFromNow);
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};



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
          <p>The ETA is:</p>
          <div>
          {nextArrivals.map((minutes, index) => (
  <ArrivalTime key={index}>{minutes}</ArrivalTime>
))}



</div>

        </>
      ) : (
        <p>No arrival data available.</p>
      )}
    </Card>
  );
};

export default NextBusCard;
