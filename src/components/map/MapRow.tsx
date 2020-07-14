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
      return "gray";
    case Tile.Floor:
      return "gray";
    case Tile.Player:
      return "#454545ff";
    case Tile.Item:
      return "#454545ff";
    case Tile.Opponent:
      return "#454545ff"
  }
};

const getTileImage = (tile: Tile): string => {
  switch (tile) {
    case Tile.Wall:
      return "/graphics/wall.png";
    case Tile.Floor:
      return "/graphics/floor.PNG";
    case Tile.Player:
      return "/graphics/player.PNG";
    case Tile.Item:
      return "/graphics/floor.PNG"; // because item is above item tile
    case Tile.Opponent:
      return "/graphics/opponent.PNG"
  }
}

const getTileItemProps = (tile: Tile, itemsOnMap: ItemProps[]): ItemProps => {
  switch (tile) {
    case Tile.Item:
      return itemsOnMap[0];
    default:
      return {name: "", image:""};
  }
};

const mapStateToProps = ({itemsOnMap }: RootState) => ({
  itemsOnMap: itemsOnMap,
});

const MapRow = ({tiles, itemsOnMap} : MapRowProps) => {
  return (
    <div className="map-row">
      {tiles.map((tile, key) => <MapTile key={key} color={getTileColor(tile)} image={getTileImage(tile)} itemProps={getTileItemProps(tile, itemsOnMap)}/>)}
    </div>
  );
}

export default connect(mapStateToProps)(MapRow);