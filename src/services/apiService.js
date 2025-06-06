// src/services/apiService.js
import { BACKEND_URL } from '../api';

export async function getRoutes() {
  const response = await fetch(`${BACKEND_URL}/routes`);
  return await response.json();
}

export async function getPrediction(route, stop) {
  try {
    const response = await fetch(`${BACKEND_URL}/prediction?route=${route}&stop=${stop}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch prediction');
    }
    const data = await response.json();
    console.log("Prediction data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return [];
  }
}

export async function getSchedule(route) {
  const response = await fetch(`${BACKEND_URL}/schedule?route=${route}`);
  return await response.json();
}

export async function getGraphAnalysis(route, direction) {
  const response = await fetch(`${BACKEND_URL}/graphanalysis?route=${route}&direction=${direction}`);
  return await response.json();
}
// Fetch stops for a given route
export async function getStops(routeId) {
  const response = await fetch(`${BACKEND_URL}/stops?route=${routeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stops');
  }
  return await response.json();
}
export async function getAvgPrediction(route, stop, hour, minute) {
  const url = `${BACKEND_URL}/avgPrediction?route=${route}&stop=${stop}&hour=${hour}&minute=${minute}`;
  console.log("GET:", url);  // <-- Add logging
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch average prediction');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAvgPrediction:', error);
    throw error;
  }
}


