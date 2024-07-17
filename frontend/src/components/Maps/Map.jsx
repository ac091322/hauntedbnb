import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: "500px",
  height: "400px",
};

const Map = React.memo(({ apiKey, lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </>
  );
});

Map.displayName = "Map";

export default Map;
