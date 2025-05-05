import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import pinIconUrl from '../image/round_pushpin.png';

const pinIcon = new L.Icon({
  iconUrl: pinIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function BusMap({ buses }) {
  const [predictions, setPredictions] = useState({});

  const fetchPrediction = async (route, stopId) => {
    try {
      const res = await fetch(`/prediction?route=${route}&stop=${stopId}`);
      const data = await res.json();
      if (data.length > 0) {
        return `${data[0].prdctdn} min`;
      } else {
        return 'No prediction available';
      }
    } catch (err) {
      console.error('Prediction fetch failed:', err);
      return 'Error fetching prediction';
    }
  };

  const handleMarkerClick = async (bus) => {
    if (!predictions[bus.stpid]) {
      const pred = await fetchPrediction(bus.route, bus.stpid);
      setPredictions((prev) => ({ ...prev, [bus.stpid]: pred }));
    }
  };

  const defaultPosition = [43.453, -76.540];

  return (
    <MapContainer center={defaultPosition} zoom={14} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {buses.map((bus, i) => (
        <Marker
          key={i}
          position={[bus.lat, bus.lon]}
          icon={pinIcon}
          eventHandlers={{
            click: () => handleMarkerClick(bus),
          }}
        >
          <Popup>
            <strong>{bus.stpnm}</strong><br />
            Stop ID: {bus.stpid}<br />
            <em>
              {predictions[bus.stpid] || 'Click to load prediction...'}
            </em>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default BusMap;
