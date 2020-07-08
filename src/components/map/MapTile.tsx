import React from 'react';

export interface MapTileProps {
  color: string;
};

export default ({ color }: MapTileProps) => {
  return (
    <div className="map-tile" style={{backgroundColor: color}}>
    </div>
  );
};
