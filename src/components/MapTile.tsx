import React from 'react';

export interface MapTileProps {
  color: string;
};

function MapTile({ color }: MapTileProps) {
  return (
    <div className="map-tile" style={{backgroundColor: color}}>
    </div>
  );
};

export default MapTile;
