import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const MapWithLine = ({ location1, location2, flag }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async (location) => {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`,
      );
      const data = response.data[0];
      return [parseFloat(data.lat), parseFloat(data.lon)];
    };

    const fetchPositions = async () => {
      try {
        const position1 = await fetchCoordinates(location1);
        const position2 = await fetchCoordinates(location2);
        setPositions([position1, position2]);
      } catch (error) {
        console.error('Error fetching coordinates: ', error);
      }
    };

    fetchPositions();
  }, [location1, location2]);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.length === 2 && (
        <>
          <Marker position={positions[0]} />
          <Marker position={positions[1]} />
          <Polyline positions={positions} color="blue" />
        </>
      )}
    </MapContainer>
  );
};

export default MapWithLine;
