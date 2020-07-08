import React from 'react';

export interface MapTileProps {
  color: string;
  icon?: string;
};

export default ({ color, icon }: MapTileProps) => {
  return (
    <div className="map-tile" style={{backgroundColor: color}}>
        {icon}
    </div>
  );
};
