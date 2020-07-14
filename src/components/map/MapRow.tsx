import React from "react";
import MapTile from "./MapTile";
import {Tile} from "../../model/tile";
import {ItemProps} from "../inventory/Item";
import {ItemBonusType} from "../../model/itemBonusType";
import RootState from "../../store/rootState";
import { connect } from "react-redux";

interface MapRowProps {
  tiles: Tile[],
  itemsOnMap: ItemProps[]
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
    case Tile.Npc:
      return "green"
  }
};

const getTileItemProps = (tile: Tile, itemsOnMap: ItemProps[]): ItemProps => {
  switch (tile) {
    case Tile.Item:
      return itemsOnMap[0];
    default:
      return {name: "", color: ""};
  }
};

const mapStateToProps = ({itemsOnMap }: RootState) => ({
  itemsOnMap: itemsOnMap,
});

const MapRow = ({tiles, itemsOnMap} : MapRowProps) => {
  return (
    <div className="map-row">
      {tiles.map((tile, key) => <MapTile key={key} color={getTileColor(tile)} itemProps={getTileItemProps(tile, itemsOnMap)}/>)}
    </div>
  );
}

export default connect(mapStateToProps)(MapRow);
