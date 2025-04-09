import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FilterBarContainer = styled.div`
  background-color: #002B5C;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem auto;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;

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
  &:focus {
    outline: none;
    border-color: #004b23;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #004b23;
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

const FilterBar = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState('');
  const [direction, setDirection] = useState('');
  const [stop, setStop] = useState('');

  // Replace these dummy options with real data later.
  const routes = ['OSW10', 'OSW1A', 'OSW11', 'OSW1B', 'OSW1C', 'OSW1D'];
  const directions = ['From Campus', 'From Downtown'];
  const stops = ['Campus Center', 'Walmart', 'Romney Lot', 'Laker Hall'];

  const handleSearch = () => {
    // Instead of showing an alert, we pass the selected state to the Tracker page.
    navigate('/tracker', { state: { route, direction, stop } });
  };

  return (
    <FilterBarContainer>
      <Select value={route} onChange={(e) => setRoute(e.target.value)}>
        <option value="">Select Route</option>
        {routes.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </Select>
      <Select value={direction} onChange={(e) => setDirection(e.target.value)}>
        <option value="">Select Direction</option>
        {directions.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </Select>
      <Select value={stop} onChange={(e) => setStop(e.target.value)}>
        <option value="">Select Stop</option>
        {stops.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </FilterBarContainer>
  );
};

export default FilterBar;
