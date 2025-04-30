// src/pages/RouteDetail.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import TripContext from '../TripContext';
import NextBusCard from '../components/NextBusCard';
import { getPrediction } from '../services/apiService';
import busData from '../Data/busData';

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
  const [nextArrivals, setNextArrivals] = useState([]);
  const [loading, setLoading] = useState(false);

  const routeInfo = busData.find((r) => r.routeId === routeId);

  useEffect(() => {
    // Optional: Pre-fill defaults if needed from trip context
    if (trip.direction) setDirection(trip.direction);
    if (trip.stop) setStop(trip.stop);
  }, [trip]);

  useEffect(() => {
    const fetchPrediction = async () => {
      if (direction && stop) {
        setLoading(true);
        try {
          if (!routeInfo) {
            console.error('Unknown route');
            setNextArrivals(["No route data"]);
            return;
          }
          const stopInfo = routeInfo.stops.find((s) => s.stopName === stop);
          if (!stopInfo) {
            console.error('Unknown stop selected');
            setNextArrivals(["No stop data"]);
            return;
          }
          console.log("Fetching prediction for", routeId, stopInfo.stopId);
          const predictionData = await getPrediction(routeId, stopInfo.stopId);
          if (predictionData.length > 0) {
            setNextArrivals([`${predictionData[0].prdctdn} min`]);
          } else {
            setNextArrivals(["No buses soon"]);
          }
        } catch (error) {
          console.error('Error fetching prediction:', error);
          setNextArrivals(["Error loading predictions"]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPrediction();
  }, [direction, stop, routeId, routeInfo]);

  return (
    <div>
      <Navbar />
      <Container>
        <Header>Route Detail for {routeId}</Header>

        <Card>
          <Label>Select Direction</Label>
          <Dropdown value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="">Select Direction</option>
            {Array.isArray(routeInfo?.directions) && routeInfo.directions.length > 0 ? (
              routeInfo.directions.map((dir) => (
                <option key={dir} value={dir}>{dir}</option>
              ))
            ) : (
              <option disabled>No directions available</option>
            )}
          </Dropdown>

          <Label>Select Stop</Label>
          <Dropdown value={stop} onChange={(e) => setStop(e.target.value)}>
            <option value="">Select Stop</option>
            {Array.isArray(routeInfo?.stops) && routeInfo.stops.length > 0 ? (
              routeInfo.stops.map((s) => (
                <option key={s.stopId} value={s.stopName}>{s.stopName}</option>
              ))
            ) : (
              <option disabled>No stops available</option>
            )}
          </Dropdown>
        </Card>

        <NextBusCard
          route={routeId}
          direction={direction}
          stop={stop}
          nextArrivals={loading ? ['Loading...'] : nextArrivals}
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
