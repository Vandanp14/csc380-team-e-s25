// src/TripContext.js
import { createContext } from 'react';

const TripContext = createContext({
  trip: { route: '', direction: '', stop: '' },
  setTrip: () => {},
});

export default TripContext;
