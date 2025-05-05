// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import { FaSpinner } from 'react-icons/fa';
import { busRoutes } from '../Data/busData';
import { getPrediction, getAvgPrediction } from '../services/apiService';

const HomeContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: 100vh;
  position: relative;
`;
const Disclaimer = styled.div`
  background-color: #f8f9fa;
  color: #333;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
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
  to   { transform: rotate(360deg); }
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
    top: 0; left: 0; right: 0; height: 4px;
    background: ${props =>
      props.$status === 'on-time'     ? 'linear-gradient(90deg, #28a745, #34ce57)' :
      props.$status === 'delayed'     ? 'linear-gradient(90deg, #dc3545, #e4606d)' :
      props.$status === 'approaching' ? 'linear-gradient(90deg, #ffc107, #ffcd39)' :
                                         '#6c757d'};
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
  width: 120px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.$status === 'on-time'     ? '#d4edda' :
    props.$status === 'delayed'     ? '#f8d7da' :
    props.$status === 'approaching' ? '#fff3cd' :
                                       '#e2e3e5'};
  color: ${props =>
    props.$status === 'on-time'     ? '#155724' :
    props.$status === 'delayed'     ? '#721c24' :
    props.$status === 'approaching' ? '#856404' :
                                       '#383d41'};
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
  const [weatherData, setWeatherData]       = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError]     = useState(null);
  const [routes, setRoutes]                 = useState([]);
  const [routesLoading, setRoutesLoading]   = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        let routesList = busRoutes;
        if (!routesList || routesList.length === 0) {
          routesList = [{ routeId:'OSW10', routeName:'10 Blue Route', defaultStopId:'15521' }];
        }

        const now    = new Date();
        const hour   = now.getHours();
        const minute = now.getMinutes();
        console.log('Calling avgPrediction with:', { hour, minute });

        const fetched = await Promise.all(
          routesList.map(async route => {
            try {
              const stopId = route.defaultStopId || route.stops?.[0]?.stopId || '15521';

              // 1) fetch both real-time + average
              const [ rawPred, avg ] = await Promise.all([
                getPrediction(route.routeId, stopId),
                getAvgPrediction(route.routeId, stopId, hour, minute)
              ]);

              // 2) normalize to array
              const arr = Array.isArray(rawPred) ? rawPred : [rawPred];

              let nextArrival = 'Coming Soon';
              let status      = 'unknown';

              if (arr[0] && arr[0].prdctdn !== null && arr[0].prdctdn !== undefined) {
              const mins = Number(arr[0].prdctdn);
              nextArrival = `${mins} min`;

              if (arr[0].dly > 0) status = 'delayed';
              else if (mins <= 2) status = 'approaching';
              else status = 'on-time';
            }

              

              const avgArrival = avg?.avg_prediction || 'Unavailable';
              return { ...route, status, nextArrival, avgArrival };
            } catch {
              return { ...route, status:'unknown', nextArrival:'Coming Soon', avgArrival:'Unavailable' };
            }
          })
        );

        setRoutes(fetched);
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
        const city    = 'Oswego,NY,US';
        const resp    = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
        );
        if (!resp.ok) throw new Error(resp.statusText);
        const data = await resp.json();
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

  const getStatusIcon = status =>
    status === 'on-time'     ? 'On-time'  :
    status === 'delayed'     ? 'Delayed'  :
    status === 'approaching' ? 'Approaching' : '?';

  const getWeatherIcon = cond =>
    ({ Clear:'☀️', Clouds:'☁️', Rain:'🌧️', Snow:'🌨️',
       Thunderstorm:'⛈️', Drizzle:'🌦️', Mist:'🌫️', Fog:'🌫️'
     }[cond] || '🌤️');

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
            <div style={{ textAlign:'center', gridColumn:'span 2' }}>
              <StyledSpinner />
              <p>Loading bus routes...</p>
            </div>
          ) : (
            routes.map(route => (
              <RouteCard
                key={route.routeId}
                onClick={() => navigate(`/route/${route.routeId}`)}
                $status={route.status}
              >
                <RouteHeader>
                  <RouteName>{route.routeName}</RouteName>
                  <StatusIcon $status={route.status}>
                    {getStatusIcon(route.status)}
                  </StatusIcon>
                </RouteHeader>

                <NextArrival>
                  <TimeIcon />Next arrival: {route.nextArrival}
                </NextArrival>

                {route.avgArrival && (
                  <NextArrival>
                    <TimeIcon />Avg arrival: {route.avgArrival}
                  </NextArrival>
                )}
              </RouteCard>
            ))
          )}
        </RouteGrid>

        <WeatherWidget>
          {weatherLoading ? (
            <div>Loading weather data...</div>
          ) : weatherError ? (
            <div>Weather data unavailable</div>
          ) : (
            <>
              <WeatherIcon>{getWeatherIcon(weatherData.weather[0].main)}</WeatherIcon>
              <WeatherInfo>
                <WeatherTemp>
                  {Math.round(weatherData.main.temp)}°F
                </WeatherTemp>
                <WeatherDesc>
                  {weatherData.weather[0].description}
                </WeatherDesc>
                <WeatherLocation>Oswego, NY</WeatherLocation>
              </WeatherInfo>
            </>
          )}
        </WeatherWidget>
      </ContentWrapper>

      <FloatingActionButton onClick={() => navigate('/tracker')}>
        🚌
      </FloatingActionButton>

      <Disclaimer>
        Arrival predictions are based on estimates and may vary. Users should account for possible delays.
      </Disclaimer>
    </HomeContainer>
  );
};

export default Home;
