// src/pages/RouteDetail.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
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

export default function RouteDetail() {
  const { routeId } = useParams();
  const { trip } = useContext(TripContext);

  const [direction, setDirection] = useState('');
  const [stopId, setStopId] = useState('');
  const [nextArrivals, setNextArrivals] = useState([]);
  const [avgArrival, setAvgArrival]   = useState('');
  const [avgTimeObj, setAvgTimeObj]   = useState(null);
  const [loading, setLoading]         = useState(false);

  const [customTimeEnabled, setCustomTimeEnabled] = useState(false);
  const [selectedHour,   setSelectedHour]   = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());

  const [stopsByDirection, setStopsByDirection] = useState({});
  const routeInfo = busData.find(r => r.routeId === routeId);

  // 1) build stopsByDirection
  useEffect(() => {
    if (!routeInfo) return;
    const all = routeInfo.stops || [];
    const mid = Math.ceil(all.length / 2);
    setStopsByDirection({
      'TO CAMPUS':   all.slice(0, mid),
      'FROM CAMPUS': all.slice(mid),
    });
  }, [routeInfo]);

  // 2) context defaults
  useEffect(() => {
    if (trip.direction) setDirection(trip.direction);
    if (trip.stopId)    setStopId(trip.stopId);
  }, [trip]);

  // 3) real-time prediction
  useEffect(() => {
    if (!routeId || !stopId) return;
    setLoading(true);

    getPrediction(routeId, stopId)
      .then(payload => {
        // normalize to array
        const list = Array.isArray(payload) ? payload : [payload];
        if (list.length > 0 && list[0].prdctdn != null) {
          const p = list[0];
          setNextArrivals([{
            minutes: `${Number(p.prdctdn)} min`,
            time: p.prdtm
          }]);
        } else {
          setNextArrivals(['No buses for a while']);
        }
      })
      .catch(err => {
        console.error('Real-time fetch error:', err);
        setNextArrivals(['Error loading predictions']);
      })
      .finally(() => setLoading(false));
  }, [routeId, stopId]);

  // 4) average prediction
  useEffect(() => {
    if (!routeId || !stopId) return;
    const now = new Date();
    const hour   = customTimeEnabled ? selectedHour   : now.getHours();
    const minute = customTimeEnabled ? selectedMinute : now.getMinutes();

    getAvgPrediction(routeId, stopId, hour, minute)
      .then(avg => {
        if (avg?.avg_prediction) {
          setAvgArrival(avg.avg_prediction);
          setAvgTimeObj(new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            avg.hour,
            avg.minute
          ));
        } else {
          setAvgArrival('Unavailable');
          setAvgTimeObj(null);
        }
      })
      .catch(err => {
        console.error('Average fetch error:', err);
        setAvgArrival('Unavailable');
        setAvgTimeObj(null);
      });
  }, [routeId, stopId, customTimeEnabled, selectedHour, selectedMinute]);

  const stopsToShow = stopsByDirection[direction] || [];

  const getRelativeTime = avgDate => {
    const diff = Math.round((avgDate.getTime() - Date.now())/ 60000);
    if (diff > 0)  return `in ~${diff} mins`;
    if (diff < 0)  return `${Math.abs(diff)} mins ago`;
    return '';
  };

  return (
    <>
      {/* simple NavLink Navbar to avoid active={false} warning */}
      <nav style={{ padding: '1rem', textAlign: 'center' }}>
        <NavLink to="/"    end style={({isActive})=>({fontWeight: isActive?'bold':'normal'})}>Home /</NavLink>{' '}
        <NavLink to="/schedule" style={({isActive})=>({fontWeight: isActive?'bold':'normal'})}>Schedule /</NavLink>{' '}
        <NavLink to="/tracker"  style={({isActive})=>({fontWeight: isActive?'bold':'normal'})}>Map /</NavLink>{' '}
        <NavLink to="/help"  style={({isActive})=>({fontWeight: isActive?'bold':'normal'})}>Help</NavLink>
      </nav>

      <Container>
        <Header>Route Detail for {routeId}</Header>

        <Card>
          <Label>Select Direction</Label>
          <Dropdown
            value={direction}
            onChange={e => {
              setDirection(e.target.value);
              setStopId('');
              setNextArrivals([]);
              setAvgArrival('');
              setAvgTimeObj(null);
            }}
          >
            <option value="">Select Direction</option>
            {Object.keys(stopsByDirection).map(dir => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </Dropdown>

          <Label>Select Stop</Label>
          <Dropdown
            value={stopId}
            onChange={e => setStopId(e.target.value)}
            disabled={!direction}
          >
            <option value="">Select Stop</option>
            {stopsToShow.map(s => (
              <option key={s.stopId} value={s.stopId}>
                {s.stopName}
              </option>
            ))}
          </Dropdown>

          <Label style={{ marginTop: 16 }}>
            <input
              type="checkbox"
              checked={customTimeEnabled}
              onChange={e => setCustomTimeEnabled(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Customize time for average prediction
          </Label>

          {customTimeEnabled && (
            <>
              <Label>Select Hour</Label>
              <Dropdown value={selectedHour} onChange={e => setSelectedHour(+e.target.value)}>
                {Array.from({ length: 24 }, (_, i) =>
                  <option key={i} value={i}>{i.toString().padStart(2,'0')}</option>
                )}
              </Dropdown>

              <Label>Select Minute</Label>
              <Dropdown value={selectedMinute} onChange={e => setSelectedMinute(+e.target.value)}>
                {Array.from({ length: 60 }, (_, i) =>
                  <option key={i} value={i}>{i.toString().padStart(2,'0')}</option>
                )}
              </Dropdown>
            </>
          )}
        </Card>

        <NextBusCard
          route={routeId}
          direction={direction}
          stop={stopId
            ? (stopsToShow.find(s=>s.stopId===stopId)?.stopName || stopId)
            : ''}
          nextArrivals={loading ? ['Loading...'] : nextArrivals}
        />

        {avgArrival && (
          <Card>
            <h3>Typical Arrival Time</h3>
            <p>
              Historical average arrival: <strong>{avgArrival}</strong>
            </p>
          </Card>
        )}

      </Container>
    </>
  );
}
