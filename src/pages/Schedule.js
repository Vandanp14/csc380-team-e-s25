import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ScheduleTable from '../components/ScheduleTable';
import NextBusCard from '../components/NextBusCard';
import TripContext from '../TripContext';
import { getSchedule } from '../services/apiService';

const ScheduleContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 1rem;
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
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

// Optionally, if no trip has been selected, allow route selection here.
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

const routeLinks = {
  OSW10: 'https://www.centro.org/docs/default-source/pdf-schedules/oswego/osw10-osw11.pdf?sfvrsn=3a62a600_4',
  OSW11: 'https://www.centro.org/docs/default-source/pdf-schedules/oswego/osw10-osw11.pdf?sfvrsn=3a62a600_4',
  OSW1A: 'https://www.centro.org/docs/default-source/pdf-schedules/oswego/osw-city.pdf?sfvrsn=57939e6_6',
  OSW2A: 'https://www.centro.org/docs/default-source/pdf-schedules/oswego/osw-city.pdf?sfvrsn=57939e6_6',
};

function Schedule() {
  const location = useLocation();
  const tripContext = useContext(TripContext);
  const initialTrip = tripContext?.trip || location.state || { route: '', direction: '', stop: '' };
  const { route, direction, stop } = initialTrip;

  const [selectedRoute, setSelectedRoute] = useState(route);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const routes = [
    { id: 'OSW10', name: 'OSW10 SUNY Oswego Blue Route' },
    { id: 'OSW10', name: 'OSW20 SUNY Oswego Green Route' },
    { id: 'OSW1A', name: 'OSW1A Walmart via 104' },
    { id: 'OSW2A', name: 'OSW2A College via 104' },
  ];

  useEffect(() => {
    const fetchSchedule = async () => {
      const activeRoute = route || selectedRoute;
      if (activeRoute) {
        setLoading(true);
        try {
          const data = await getSchedule(activeRoute);
          setScheduleData(data);
        } catch (error) {
          console.error('Error fetching schedule:', error);
          setScheduleData([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSchedule();
  }, [route, selectedRoute]);

  const handleRouteChange = (event) => {
    const routeId = event.target.value;
    setSelectedRoute(routeId);
    if (routeLinks[routeId]) {
      window.open(routeLinks[routeId], '_blank'); // Open PDF in a new tab
    }
  };

  return (
    <ScheduleContainer>
      <Navbar />
      <ContentWrapper>
        <ScheduleHeader>
          <Title>Bus Schedule</Title>
          {route ? (
            <Subtitle>
              Tracking: {route} — {direction} to {stop}
            </Subtitle>
          ) : (
            <Subtitle>Select a route to view the schedule</Subtitle>
          )}
        </ScheduleHeader>
        
        {!route && (
          <SelectContainer>
            <StyledSelect 
              value={selectedRoute} 
              onChange={handleRouteChange}  // Link the route selection to PDF redirection
            >
              <Option value="">Select a route</Option>
              {routes.map((r) => (
                <Option key={r.id} value={r.id}>
                  {r.name}
                </Option>
              ))}
            </StyledSelect>
          </SelectContainer>
        )}
        
        { (route || selectedRoute) ? (
          <ScheduleTable route={route || selectedRoute} scheduleData={scheduleData} loading={loading} />
        ) : (
          <NoSelectionMessage>
            Please select a route to view the schedule.
          </NoSelectionMessage>
        )}
      </ContentWrapper>
    </ScheduleContainer>
  );
}

export default Schedule;
