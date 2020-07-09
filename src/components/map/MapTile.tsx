import React from "react";
import ItemView, {ItemProps} from "../inventory/Item";

export interface MapTileProps {
  color: string;
  itemProps: ItemProps;
};

export default ({ color, itemProps }: MapTileProps) => {
  return (
    <div className="map-tile" style={{backgroundColor: color}}>
      <ItemView {...itemProps}/>
    </div>
  );
};
