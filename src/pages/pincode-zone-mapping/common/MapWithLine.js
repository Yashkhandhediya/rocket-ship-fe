import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MapWithLine = ({ location1, location2 }) => {
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

  const customIcon = L.divIcon({
    className: '', // Empty className so you can use Tailwind CSS classes directly
    html: `      <div class="relative flex items-center justify-center w-5 h-5 bg-red-600 rounded-full text-white">
        <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-b-red-600 transform translate-y-1/2"></div>
      </div>
`,
  });

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Initial center position
      zoom={5}
      whenCreated={(map) => map.invalidateSize()} // Ensure map is resized properly
      className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.length === 2 && <ZoomToFitBounds positions={positions} />}
      {positions.length === 2 && (
        <>
          <Marker position={positions[0]} icon={customIcon} />
          <Marker position={positions[1]} icon={customIcon} />
          <Polyline positions={positions} color="red" />
        </>
      )}
    </MapContainer>
  );
};

const ZoomToFitBounds = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 2) {
      map.fitBounds(positions); // Automatically zooms and fits the map to the positions
    }
  }, [map, positions]);

  return null; // No UI component, just handles map zooming
};

export default MapWithLine;
