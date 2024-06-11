// services/map.jsx
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '50%',
  height: '600px'
};

const center = {
  lat: 13.748342467462374,
  lng: 100.61907217693282
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey = "AIzaSyCHcXH7FXJgxLJYfvBcSouw7U9Lwy1CIew">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
