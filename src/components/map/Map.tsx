import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import { Tile } from "../../model/tile";
import RootState, { Position } from "../../store/rootState";
import { deleteItemFromMap, addItem} from "../../store/actions";
import { Dispatch } from "../../store";
import { ItemProps } from "../inventory/Item";

interface MapProps {
  gameMap: Tile[][],
  playerPosition: Position,
  itemsPosition: Position[],
  changeMap: (newPosition: Position) => void;
}

const placeTile = (gameMap: Tile[][], position: Position, tileType: Tile) => {
  const clonedMap = gameMap.map(arr => arr.slice());
  clonedMap[position[0]][position[1]] = tileType;
  return clonedMap;
};

const Map = ({ gameMap, playerPosition, itemsPosition, changeMap }: MapProps) => {
  let mapWithPlayer = placeTile(gameMap, playerPosition, Tile.Player);
  itemsPosition.forEach(position => mapWithPlayer = placeTile(mapWithPlayer, position, Tile.Item));
  itemsPosition.filter(position => {
    if(position[0] === playerPosition[0] && position[1] === playerPosition[1]) {
      changeMap(playerPosition);
    }
  });
  return (
  <div className="map">
    {mapWithPlayer.map((row, key) => <MapRow key={key} tiles={row} />)}
  </div>
  )
};

const mapStateToProps = ({ gameMap, playerPosition, itemsPosition }: RootState) => ({
  gameMap: gameMap,
  playerPosition: playerPosition,
  itemsPosition: itemsPosition,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeMap: (newPosition: Position) => {
      dispatch(deleteItemFromMap(newPosition));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
