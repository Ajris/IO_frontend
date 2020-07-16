import React from "react";
import ItemView, {ItemProps} from "../inventory/Item";

export interface MapTileProps {
  color: string;
  image: string;
  itemProps: ItemProps;
};

export default ({color, image, itemProps }: MapTileProps) => {
  return (
    <div className="map-tile" style={{ backgroundColor: color, backgroundImage: `url(${image})`}}>
      <ItemView {...itemProps}/>
    </div>
  );
};
