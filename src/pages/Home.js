// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import Navbar from '../components/Navbar';
import { FaSpinner } from 'react-icons/fa';

const HomeContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: 100vh;
  position: relative;
`;

const HeroSection = styled.div`
  height: 300px;
  background-image: url('/images/bus-hero.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 43, 92, 0.7), rgba(0, 43, 92, 0.5));
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 1.5rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RouteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledSpinner = styled(FaSpinner)`
  font-size: 2rem;
  color: #004b23;
  animation: ${spin} 1s linear infinite;
`;


const RouteCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RouteName = styled.h3`
  color: #002B5C;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
`;

const StatusIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 0.9rem;
  font-weight: 600;
`;

const NextArrival = styled.div`
  color: #666;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimeIcon = styled.span`
  color: #002B5C;
  font-size: 1.1rem;
`;

const WeatherWidget = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const WeatherIcon = styled.div`
  font-size: 2.5rem;
`;

const WeatherInfo = styled.div`
  flex: 1;
`;

const WeatherTemp = styled.div`
  color: #002B5C;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const WeatherDesc = styled.div`
  color: #666;
  font-size: 1rem;
`;

const WeatherLocation = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #002B5C;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    transform: scale(1.1);
    background: #001f42;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const [routes, setRoutes] = useState([]);
  const [routesLoading, setRoutesLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // TODO: Remove this simulated delay when connecting to backend API
        await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
        // TODO: Replace the below hardcoded bus routes with real backend API query
        // Example: const response = await fetch('https://your-backend-url/api/busPredictions');
        // const fetchedRoutes = await response.json();
        // setRoutes(fetchedRoutes);
        const fetchedRoutes = [
          { id: 'OSW10', name: 'OSW10 Blue Route', status: 'on-time', nextArrival: '5 min' },
          { id: 'OSW11', name: 'OSW11 Green Route', status: 'delayed', nextArrival: '12 min' },
          { id: 'OSW1A', name: 'OSW1A Walmart via 104', status: 'approaching', nextArrival: '2 min' },
          { id: 'OSW2A', name: 'OSW2A College via 104', status: 'on-time', nextArrival: '8 min' },
        ];
        setRoutes(fetchedRoutes);
      } catch (err) {
        console.error('Error fetching routes:', err);
      } finally {
        setRoutesLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = 'ab385b44b9b33d12cf4397188ca4381b';
        const city = 'Oswego,NY,US';
        const units = 'imperial';

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.main || !data.weather || !data.weather[0]) {
          throw new Error('Invalid weather data format');
        }

        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setWeatherError(err.message);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

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

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '🌨️';
      case 'Thunderstorm':
        return '⛈️';
      case 'Drizzle':
        return '🌦️';
      case 'Mist':
      case 'Fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  return (
    <HomeContainer>
      <Navbar />
      <HeroSection>
        <HeroContent>
          <HeroTitle>CENTRO BUS PREDICTOR</HeroTitle>
          <HeroSubtitle>Real-time bus arrival predictions for Oswego, NY</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentWrapper>
        <RouteGrid>
          {routesLoading ? (
            <div style={{ textAlign: 'center', gridColumn: 'span 2' }}>
              <StyledSpinner />
              <p>Loading bus routes...</p>
            </div>
          ) : (
            routes.map(route => (
              <RouteCard
                key={route.id}
                onClick={() => navigate(`/route/${route.id}`)}
                status={route.status}
              >
                <RouteHeader>
                  <RouteName>{route.name}</RouteName>
                  <StatusIcon status={route.status}>
                    {getStatusIcon(route.status)}
                  </StatusIcon>
                </RouteHeader>
                <NextArrival>
                  <TimeIcon>🕒</TimeIcon>
                  Next arrival: {route.nextArrival}
                </NextArrival>
              </RouteCard>
            ))
          )}
        </RouteGrid>

        <WeatherWidget>
          {weatherLoading ? (
            <div>Loading weather data...</div>
          ) : weatherError ? (
            <div>Weather data unavailable</div>
          ) : weatherData ? (
            <>
              <WeatherIcon>
                {getWeatherIcon(weatherData.weather[0].main)}
              </WeatherIcon>
              <WeatherInfo>
                <WeatherTemp>{Math.round(weatherData.main.temp)}°F</WeatherTemp>
                <WeatherDesc>{weatherData.weather[0].description}</WeatherDesc>
                <WeatherLocation>Oswego, NY</WeatherLocation>
              </WeatherInfo>
            </>
          ) : null}
        </WeatherWidget>
      </ContentWrapper>

      <FloatingActionButton onClick={() => navigate('/tracker')}>
        🚌
      </FloatingActionButton>
    </HomeContainer>
  );
};

export default Home;
