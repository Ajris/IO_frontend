import React from "react";
import MapTile from "./MapTile";
import { Tile } from "../../model/tile";

interface MapRowProps {
  tiles: Tile[]
}

const getTileColor = (tile: Tile): string => {
  switch (tile) {
    case Tile.Wall:
      return "black";
    case Tile.Floor:
      return "white";
  }
}

export default ({ tiles }: MapRowProps) => {
  return (
    <div className="map-row">
      {tiles.map(tile => <MapTile color={getTileColor(tile)} />)}
    </div>
  );
}

