// src/pages/Tracker.js
import React, { useContext, useState, useEffect } from 'react';
import TripContext from '../TripContext';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import NextBusCard from '../components/NextBusCard';
import styled from 'styled-components';
import { getPrediction } from '../services/apiService';

const Header = styled.h2`
  text-align: center;
  margin: 1rem 0;
  color: #002B5C;
`;

function Tracker() {
  const { trip } = useContext(TripContext);
  const { route, direction, stop } = trip;
  const [nextArrivals, setNextArrivals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrediction = async () => {
      if (route && stop) {
        setLoading(true);
        try {
          const predictionData = await getPrediction(route, stop);
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
  }, [route, stop]);

  return (
    <div>
      <Navbar />
      <FilterBar />
      <Header>
        Tracking: {route ? route : 'N/A'} — {direction ? direction : 'N/A'} to {stop ? stop : 'N/A'}
      </Header>
      <NextBusCard
        route={route}
        direction={direction}
        stop={stop}
        nextArrivals={loading ? ['Loading...'] : nextArrivals}
      />
      {/* Here you would add components for the live map or additional info */}
    </div>
  );
}

export default Tracker;
