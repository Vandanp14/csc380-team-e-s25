import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import pinIconUrl from '../image/round_pushpin.png';
import { getPrediction } from '../services/apiService';

const pinIcon = new L.Icon({
  iconUrl: pinIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function BusMap({ buses }) {
  const [predictions, setPredictions] = useState({});
  const markerRefs = useRef({}); // key: stopId => ref

  const fetchPrediction = async (route, stopId) => {
    try {
      const data = await getPrediction(route, stopId);
      if (Array.isArray(data) && data.length > 0) {
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
      setPredictions((prev) => {
        const updated = { ...prev, [bus.stpid]: pred };

        const marker = markerRefs.current[bus.stpid];
        if (marker && marker.getPopup && marker.isPopupOpen()) {
          marker.setPopupContent(`
            <strong>${bus.stpnm}</strong><br />
            Stop ID: ${bus.stpid}<br />
            <em>${pred}</em>
          `);
          marker.openPopup(); // force refresh
        }

        return updated;
      });
    }
  };

  const defaultPosition = [43.453, -76.540];

  return (
    <MapContainer center={defaultPosition} zoom={14} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {buses.map((bus, i) => {
        if (!markerRefs.current[bus.stpid]) {
          markerRefs.current[bus.stpid] = React.createRef();
        }

        return (
          <Marker
            key={i}
            ref={markerRefs.current[bus.stpid]}
            position={[bus.lat, bus.lon]}
            icon={pinIcon}
            eventHandlers={{
              click: () => handleMarkerClick(bus),
            }}
          >
            <Popup>
              <strong>{bus.stpnm}</strong><br />
              Stop ID: {bus.stpid}<br />
              <em>{predictions[bus.stpid] || 'Click to load prediction...'}</em>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default BusMap;
