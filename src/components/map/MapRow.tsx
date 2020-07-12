import React from "react";
import MapTile from "./MapTile";
import {Tile} from "../../model/tile";
import {ItemProps} from "../inventory/Item";
import {ItemBonusType} from "../../model/itemBonusType";

interface MapRowProps {
  tiles: Tile[]
}

const getTileColor = (tile: Tile): string => {
  switch (tile) {
    case Tile.Wall:
      return "black";
    case Tile.Floor:
      return "white";
    case Tile.Player:
      return "blue";
    case Tile.Item:
      return "white"
    case Tile.Opponent:
      return "pink"
  }
};

const getTileItemProps = (tile: Tile): ItemProps => {
  switch (tile) {
    case Tile.Item:
      return {name: "itemik", color: "red", image: "", bonusType: ItemBonusType.DAMAGE, value: 10};
    default:
      return {name: "", color: "", image: ""};
  }
};


export default ({ tiles }: MapRowProps) => {
  return (
    <div className="map-row">
      { tiles.map(tile => <MapTile color={getTileColor(tile)} itemProps={getTileItemProps(tile)}/>) }
    </div>
  );
}

