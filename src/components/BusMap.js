import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import pinIconUrl from '../image/round_pushpin.png';
import { getPrediction } from '../services/apiService';

// 📍 Custom location pin icon
const pinIcon = new L.Icon({
  iconUrl: pinIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function BusMap({ buses }) {
  const [predictions, setPredictions] = useState({});
  const markerRefs = useRef({});

  // 🔁 Fetch prediction from the backend
 const fetchPrediction = async (route, stopId) => {
  console.log("🔍 Fetching prediction for", route, stopId);
  try {
    const data = await getPrediction(route, stopId);
    console.log("✅ Prediction data received:", data);

    // 💥 This was expecting an array — but you’re getting an object!
    if (data && typeof data === 'object' && 'prdctdn' in data) {
      return `${data.prdctdn} min`;
    } else {
      return 'No prediction available';
    }
  } catch (err) {
    console.error('❌ Error fetching prediction:', err);
    return 'Error fetching prediction';
  }
};


  // 🧠 Triggered when a marker is clicked
  const handleMarkerClick = async (bus) => {
    console.log("📌 Marker clicked for:", bus.stpnm, "| Stop ID:", bus.stpid);

    // Only fetch if we don't already have it
    if (!predictions[bus.stpid]) {
      const pred = await fetchPrediction(bus.route, bus.stpid);

      setPredictions((prev) => {
        const updated = { ...prev, [bus.stpid]: pred };
        console.log("🧠 Updated predictions state:", updated);
        return updated;
      });

      // Reopen popup to trigger re-render
      setTimeout(() => {
        const marker = markerRefs.current[bus.stpid];
        if (marker && marker._popup) {
          marker.closePopup();
          marker.openPopup();
        }
      }, 100);
    } else {
      console.log("🔁 Using cached prediction for", bus.stpid);
    }
  };

  const defaultPosition = [43.453, -76.540];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={14}
      style={{ height: '500px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {buses.map((bus, i) => (
        <Marker
          key={i}
          position={[bus.lat, bus.lon]}
          icon={pinIcon}
          ref={(ref) => {
            if (ref) markerRefs.current[bus.stpid] = ref;
          }}
          eventHandlers={{
            click: () => handleMarkerClick(bus),
          }}
        >
          <Popup autoPan={true}>
            <PopupContent bus={bus} prediction={predictions[bus.stpid]} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

// 📋 Renders each popup's info
function PopupContent({ bus, prediction }) {
  console.log("📦 Rendering popup for:", bus.stpnm, "| Prediction:", prediction);

  const isLoaded = typeof prediction === 'string' && prediction.includes('min');

  return (
    <div>
      <strong>{bus.stpnm}</strong><br />
      Stop ID: {bus.stpid}<br />
      <em>
        {isLoaded
          ? `Next arrival in: ${prediction}`
          : prediction || 'Loading...'}
      </em>
    </div>
  );
}

export default BusMap;
