// src/pages/RouteDetail.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import TripContext from '../TripContext';
import NextBusCard from '../components/NextBusCard';
import { getPrediction, getAvgPrediction } from '../services/apiService';
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
  const [stopId, setStopId] = useState('');
  const [nextArrivals, setNextArrivals] = useState([]);
  const [avgArrival, setAvgArrival] = useState('');
  const [avgTimeObj, setAvgTimeObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stopsByDirection, setStopsByDirection] = useState({});

  const routeInfo = busData.find((r) => r.routeId === routeId);

  useEffect(() => {
    if (!routeInfo) return;

    const allStops = routeInfo.stops || [];
    const mid = Math.ceil(allStops.length / 2);

    const simulated = {
      'TO CAMPUS': allStops.slice(0, mid),
      'FROM CAMPUS': allStops.slice(mid),
    };

    setStopsByDirection(simulated);
  }, [routeInfo]);

  useEffect(() => {
    if (trip.direction) setDirection(trip.direction);
    if (trip.stopId) setStopId(trip.stopId);
  }, [trip]);

  useEffect(() => {
    const fetchData = async () => {
      if (!stopId || !routeId) return;

      setLoading(true);
      try {
        const [predictionData, avgData] = await Promise.all([
          getPrediction(routeId, stopId),
          getAvgPrediction(routeId, stopId)
        ]);

        // Real-time prediction
        if (predictionData.length > 0) {
          setNextArrivals([`${predictionData[0].prdctdn} min`]);
        } else {
          setNextArrivals(["No buses soon"]);
        }

        // Average prediction
        if (avgData?.avg_prediction) {
          setAvgArrival(avgData.avg_prediction);

          const now = new Date();
          const avgDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            avgData.hour,
            avgData.minute
          );
          setAvgTimeObj(avgDate);
        } else {
          setAvgArrival('Unavailable');
          setAvgTimeObj(null);
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setNextArrivals(["Error loading predictions"]);
        setAvgArrival('Unavailable');
        setAvgTimeObj(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stopId, routeId]);

  const stopsToShow = stopsByDirection[direction] || [];

  const getRelativeTime = (avgDate) => {
    const now = new Date();
    const diffMin = Math.round((avgDate - now) / 60000);

    if (diffMin > 0) return `in ~${diffMin} mins`;
    if (diffMin < 0) return `${Math.abs(diffMin)} mins ago`;
    return 'now';
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Header>Route Detail for {routeId}</Header>

        <Card>
          <Label>Select Direction</Label>
          <Dropdown
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value);
              setStopId('');
              setNextArrivals([]);
              setAvgArrival('');
              setAvgTimeObj(null);
            }}
          >
            <option value="">Select Direction</option>
            {Object.keys(stopsByDirection).map((dir) => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </Dropdown>

          <Label>Select Stop</Label>
          <Dropdown
            value={stopId}
            onChange={(e) => setStopId(e.target.value)}
            disabled={!direction}
          >
            <option value="">Select Stop</option>
            {stopsToShow.map((s) => (
              <option key={s.stopId} value={s.stopId}>
                {s.stopName}
              </option>
            ))}
          </Dropdown>
        </Card>

        <NextBusCard
          route={routeId}
          direction={direction}
          stop={
            stopId
              ? (stopsToShow.find(s => s.stopId === stopId)?.stopName || stopId)
              : ''
          }
          nextArrivals={loading ? ['Loading...'] : nextArrivals}
        />

        {avgArrival && (
          <Card>
            <h3>Typical Arrival Time</h3>
            <p>
              Historical average arrival: <strong>{avgArrival}</strong>
              {avgTimeObj && (
                <span style={{ color: '#777', fontSize: '0.9rem' }}>
                  {' '}({getRelativeTime(avgTimeObj)})
                </span>
              )}
            </p>
          </Card>
        )}

        <Card>
          <h3>Arrival Trends</h3>
          <p>Graphical analysis coming soon…</p>
        </Card>
      </Container>
    </div>
  );
}

export default RouteDetail;
