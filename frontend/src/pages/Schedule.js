import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import ScheduleTable from '../components/ScheduleTable';

const ScheduleContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const ScheduleHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #002B5C;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  
  font-size: 1.1rem;
  margin: 0;
`;

const SelectContainer = styled.div`
  margin-bottom: 2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23002B5C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
  
  &:hover {
    border-color: #002B5C;
  }
  
  &:focus {
    outline: none;
    border-color: #002B5C;
    box-shadow: 0 0 0 3px rgba(0, 43, 92, 0.1);
  }
`;

const Option = styled.option`
  padding: 1rem;
`;

const NoSelectionMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
  font-size: 1.1rem;
`;

const Schedule = () => {
  const location = useLocation();
  const { route: initialRoute, direction, stop } = location.state || { route: '', direction: '', stop: '' };
  const [selectedRoute, setSelectedRoute] = useState(initialRoute);

  const routes = [
    { id: 'OSW10', name: 'OSW10 SUNY Oswego Blue Route' },
    { id: 'OSW20', name: 'OSW20 SUNY Oswego Red Route' },
    { id: 'OSW30', name: 'OSW30 SUNY Oswego Green Route' },
  ];

  return (
    <ScheduleContainer>
      <Navbar />
      <ContentWrapper>
        <ScheduleHeader>
          <Title>Bus Schedule</Title>
          <Subtitle>Select a route to view the schedule</Subtitle>
        </ScheduleHeader>
        
        <SelectContainer>
          <StyledSelect 
            value={selectedRoute} 
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <Option value="">Select a route</Option>
            {routes.map(route => (
              <Option key={route.id} value={route.id}>
                {route.name}
              </Option>
            ))}
          </StyledSelect>
        </SelectContainer>
        
        {selectedRoute ? (
          <ScheduleTable route={selectedRoute} />
        ) : (
          <NoSelectionMessage>
            Please select a route to view the schedule
          </NoSelectionMessage>
        )}
      </ContentWrapper>
    </ScheduleContainer>
  );
};

export default Schedule;
