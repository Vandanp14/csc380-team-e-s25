import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

const MapWrapper = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 2rem;
`;

const defaultPosition = [43.4553, -76.5105];

function MapView({ selectedRoute }) {
  return (
    <MapWrapper>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition}>
          <Popup>
            Default Location: SUNY Oswego<br />
            {selectedRoute && selectedRoute !== "All Routes" && `Filtering by ${selectedRoute}`}
          </Popup>
        </Marker>
      </MapContainer>
    </MapWrapper>
  );
}

export default MapView;
