'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerMapProps {
  lat: number;
  lng: number;
  onChange: (coords: { lat: number; lng: number }) => void;
}

function MapClickHandler({ onChange }: { onChange: (coords: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function MapCenterRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom() < 13 ? 15 : map.getZoom());
  }, [center, map]);
  return null;
}

export default function LocationPickerMap({ lat, lng, onChange }: LocationPickerMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const markerIcon = useMemo(() => {
    return L.divIcon({
      className: 'custom-picker-marker',
      html: `<div style="
        background: #16C79A;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        box-shadow: 0 4px 15px rgba(22, 199, 154, 0.6), 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        animation: markerPulse 2s infinite ease-in-out;
      ">📍</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs font-semibold">
        Xarita yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onChange={onChange} />
        <MapCenterRecenter center={[lat, lng]} />
        <Marker
          position={[lat, lng]}
          draggable={true}
          icon={markerIcon}
          eventHandlers={{
            dragend(e) {
              const marker = e.target;
              const position = marker.getLatLng();
              onChange({ lat: position.lat, lng: position.lng });
            },
          }}
        />
      </MapContainer>
    </div>
  );
}
