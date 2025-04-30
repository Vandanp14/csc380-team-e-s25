// src/components/FilterBar.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TripContext from '../TripContext';
import busData from '../Data/busData';

const FilterBarContainer = styled.div`
  background-color:hsl(39, 96.20%, 69.00%);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem auto;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: #004b23;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color:rgb(1, 88, 42);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  &:hover {
    background-color: #003a1a;
    transform: translateY(-2px);
  }
`;

const FilterBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { setTrip } = useContext(TripContext);

  const [localTrip, setLocalTrip] = useState({ route: '', direction: '', stop: '' });

  const selectedRoute = busData.find(r => r.routeId === localTrip.route);
  const stops = selectedRoute ? selectedRoute.stops : [];
  const directions = selectedRoute ? selectedRoute.directions : [];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(localTrip);
    } else {
      setTrip(localTrip);
      navigate('/tracker');
    }
  };

  return (
    <FilterBarContainer>
      <Select
        value={localTrip.route}
        onChange={(e) =>
          setLocalTrip({ ...localTrip, route: e.target.value, direction: '', stop: '' })
        }
      >
        <option value="">Select Route</option>
        {busData.map((r) => (
          <option key={r.routeId} value={r.routeId}>{r.routeId}</option>
        ))}
      </Select>
      <Select
        value={localTrip.direction}
        onChange={(e) =>
          setLocalTrip({ ...localTrip, direction: e.target.value })
        }
        disabled={!localTrip.route}
      >
        <option value="">Select Direction</option>
        {directions.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </Select>
      <Select
        value={localTrip.stop}
        onChange={(e) =>
          setLocalTrip({ ...localTrip, stop: e.target.value })
        }
        disabled={!localTrip.route}
      >
        <option value="">Select Stop</option>
        {stops.map((s) => (
          <option key={s.stopId} value={s.stopId}>{s.stopName}</option>
        ))}
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </FilterBarContainer>
  );
};

export default FilterBar;
