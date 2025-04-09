import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const RouteDetailContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: 100vh;
  padding-top: 80px;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #002B5C;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f7ff;
  }
`;

const RouteTitle = styled.h1`
  color: #002B5C;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 700;
`;

const StatusBadge = styled.div`
  background-color: ${props => 
    props.status === 'on-time' ? '#d4edda' : 
    props.status === 'delayed' ? '#f8d7da' : 
    props.status === 'approaching' ? '#fff3cd' : '#e2e3e5'
  };
  color: ${props => 
    props.status === 'on-time' ? '#155724' : 
    props.status === 'delayed' ? '#721c24' : 
    props.status === 'approaching' ? '#856404' : '#383d41'
  };
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIcon = styled.span`
  font-size: 1rem;
`;

const NextArrivalCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => 
      props.status === 'on-time' ? 'linear-gradient(90deg, #28a745, #34ce57)' : 
      props.status === 'delayed' ? 'linear-gradient(90deg, #dc3545, #e4606d)' : 
      props.status === 'approaching' ? 'linear-gradient(90deg, #ffc107, #ffcd39)' : '#6c757d'
    };
  }
`;

const NextArrivalLabel = styled.div`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const NextArrivalTime = styled.div`
  color: #002B5C;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const TimeIcon = styled.span`
  font-size: 2rem;
`;

const NextArrivalLocation = styled.div`
  color: #666;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const LocationIcon = styled.span`
  font-size: 1.2rem;
`;

const StopsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StopsHeader = styled.h2`
  color: #002B5C;
  font-size: 1.3rem;
  margin: 0 0 1.5rem 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StopItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.active ? '#f0f7ff' : 'transparent'};
  border-left: 4px solid ${props => props.active ? '#002B5C' : 'transparent'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const StopName = styled.div`
  color: #333;
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StopIcon = styled.span`
  font-size: 1rem;
  color: ${props => props.active ? '#002B5C' : '#999'};
`;

const StopTime = styled.div`
  color: #002B5C;
  font-weight: ${props => props.active ? '600' : '500'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimeBadge = styled.span`
  background-color: ${props => props.active ? '#e0f2ff' : '#f5f5f5'};
  color: ${props => props.active ? '#002B5C' : '#666'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const RefreshButton = styled.button`
  background: #002B5C;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #001f42;
    transform: translateY(-2px);
  }
`;

const MapButton = styled.button`
  background: white;
  color: #002B5C;
  border: 1px solid #002B5C;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f7ff;
    transform: translateY(-2px);
  }
`;

const RouteDetail = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Sample route data - in a real app, this would come from an API
  const sampleRoutes = {
    'OSW10': {
      name: 'OSW10 Blue Route',
      status: 'on-time',
      nextArrival: '5 min',
      nextStop: 'SUNY Oswego Campus Center',
      stops: [
        { id: 1, name: 'SUNY Oswego Campus Center', time: '5 min', active: true },
        { id: 2, name: 'Rudolph St & Centennial Dr', time: '8 min', active: false },
        { id: 3, name: 'SUNY Oswego New Campus', time: '12 min', active: false },
        { id: 4, name: 'SUNY Oswego The Village Residence', time: '15 min', active: false },
        { id: 5, name: 'Oswego City Hall', time: '20 min', active: false },
        { id: 6, name: 'Oswego Public Library', time: '25 min', active: false },
      ]
    },
    'OSW20': {
      name: 'OSW20 Red Route',
      status: 'delayed',
      nextArrival: '12 min',
      nextStop: 'Oswego City Hall',
      stops: [
        { id: 1, name: 'Oswego City Hall', time: '12 min', active: true },
        { id: 2, name: 'Oswego Public Library', time: '15 min', active: false },
        { id: 3, name: 'SUNY Oswego Campus Center', time: '20 min', active: false },
        { id: 4, name: 'Rudolph St & Centennial Dr', time: '25 min', active: false },
        { id: 5, name: 'SUNY Oswego New Campus', time: '30 min', active: false },
      ]
    },
    'OSW30': {
      name: 'OSW30 Green Route',
      status: 'approaching',
      nextArrival: '2 min',
      nextStop: 'SUNY Oswego The Village Residence',
      stops: [
        { id: 1, name: 'SUNY Oswego The Village Residence', time: '2 min', active: true },
        { id: 2, name: 'SUNY Oswego New Campus', time: '5 min', active: false },
        { id: 3, name: 'Rudolph St & Centennial Dr', time: '8 min', active: false },
        { id: 4, name: 'SUNY Oswego Campus Center', time: '12 min', active: false },
        { id: 5, name: 'Oswego City Hall', time: '18 min', active: false },
      ]
    },
    'OSW40': {
      name: 'OSW40 Yellow Route',
      status: 'on-time',
      nextArrival: '8 min',
      nextStop: 'Oswego Public Library',
      stops: [
        { id: 1, name: 'Oswego Public Library', time: '8 min', active: true },
        { id: 2, name: 'Oswego City Hall', time: '12 min', active: false },
        { id: 3, name: 'SUNY Oswego Campus Center', time: '18 min', active: false },
        { id: 4, name: 'Rudolph St & Centennial Dr', time: '22 min', active: false },
        { id: 5, name: 'SUNY Oswego New Campus', time: '28 min', active: false },
      ]
    },
    'OSW50': {
      name: 'OSW50 Purple Route',
      status: 'on-time',
      nextArrival: '15 min',
      nextStop: 'Rudolph St & Centennial Dr',
      stops: [
        { id: 1, name: 'Rudolph St & Centennial Dr', time: '15 min', active: true },
        { id: 2, name: 'SUNY Oswego New Campus', time: '18 min', active: false },
        { id: 3, name: 'SUNY Oswego The Village Residence', time: '22 min', active: false },
        { id: 4, name: 'SUNY Oswego Campus Center', time: '28 min', active: false },
        { id: 5, name: 'Oswego City Hall', time: '35 min', active: false },
      ]
    },
    'OSW60': {
      name: 'OSW60 Orange Route',
      status: 'delayed',
      nextArrival: '20 min',
      nextStop: 'SUNY Oswego New Campus',
      stops: [
        { id: 1, name: 'SUNY Oswego New Campus', time: '20 min', active: true },
        { id: 2, name: 'SUNY Oswego The Village Residence', time: '25 min', active: false },
        { id: 3, name: 'SUNY Oswego Campus Center', time: '30 min', active: false },
        { id: 4, name: 'Oswego City Hall', time: '38 min', active: false },
        { id: 5, name: 'Oswego Public Library', time: '45 min', active: false },
      ]
    },
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setRouteData(sampleRoutes[routeId] || null);
      setLoading(false);
    }, 500);
  }, [routeId]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setRouteData(sampleRoutes[routeId] || null);
      setLoading(false);
    }, 500);
  };

  const handleMapView = () => {
    // In a real app, this would open a map view
    alert('Map view would open here');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
        return '✓';
      case 'delayed':
        return '⚠';
      case 'approaching':
        return '→';
      default:
        return '?';
    }
  };

  if (loading) {
    return (
      <RouteDetailContainer>
        <Navbar />
        <ContentWrapper>
          <div>Loading route information...</div>
        </ContentWrapper>
      </RouteDetailContainer>
    );
  }

  if (!routeData) {
    return (
      <RouteDetailContainer>
        <Navbar />
        <ContentWrapper>
          <div>Route not found</div>
          <BackButton onClick={() => navigate('/')}>← Back to Home</BackButton>
        </ContentWrapper>
      </RouteDetailContainer>
    );
  }

  return (
    <RouteDetailContainer>
      <Navbar />
      <ContentWrapper>
        <Header>
          <BackButton onClick={() => navigate('/')}>← Back to Home</BackButton>
          <RouteTitle>{routeData.name}</RouteTitle>
          <StatusBadge status={routeData.status}>
            <StatusIcon>{getStatusIcon(routeData.status)}</StatusIcon>
            {routeData.status === 'on-time' ? 'On Time' : 
             routeData.status === 'delayed' ? 'Delayed' : 
             routeData.status === 'approaching' ? 'Approaching' : 'Unknown'}
          </StatusBadge>
        </Header>
        
        <NextArrivalCard status={routeData.status}>
          <NextArrivalLabel>Next Arrival</NextArrivalLabel>
          <NextArrivalTime>
            <TimeIcon>🕒</TimeIcon>
            {routeData.nextArrival}
          </NextArrivalTime>
          <NextArrivalLocation>
            <LocationIcon>📍</LocationIcon>
            at {routeData.nextStop}
          </NextArrivalLocation>
        </NextArrivalCard>
        
        <StopsContainer>
          <StopsHeader>
            <span>📍</span>
            Upcoming Stops
          </StopsHeader>
          <StopList>
            {routeData.stops.map(stop => (
              <StopItem key={stop.id} active={stop.active}>
                <StopName active={stop.active}>
                  <StopIcon active={stop.active}>
                    {stop.active ? '🚌' : '⏱️'}
                  </StopIcon>
                  {stop.name}
                </StopName>
                <StopTime active={stop.active}>
                  <TimeBadge active={stop.active}>{stop.time}</TimeBadge>
                </StopTime>
              </StopItem>
            ))}
          </StopList>
        </StopsContainer>
        
        <ActionBar>
          <RefreshButton onClick={handleRefresh}>
            ↻ Refresh
          </RefreshButton>
          <MapButton onClick={handleMapView}>
            🗺️ View on Map
          </MapButton>
        </ActionBar>
      </ContentWrapper>
    </RouteDetailContainer>
  );
};

export default RouteDetail; 