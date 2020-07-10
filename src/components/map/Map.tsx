import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import { Tile } from "../../model/tile";
import RootState, { Position } from "../../store/rootState";
import {itemPositions} from "../../model/Config";

interface MapProps {
  gameMap: Tile[][],
  playerPosition: Position,
}

const placeTile = (gameMap: Tile[][], position: Position, tileType: Tile) => {
  const clonedMap = gameMap.map(arr => arr.slice());
  clonedMap[position[0]][position[1]] = tileType;
  return clonedMap;
};

const Map = ({ gameMap, playerPosition }: MapProps) => {
  let mapWithPlayer = placeTile(gameMap, playerPosition, Tile.Player);
  itemPositions.forEach(position => mapWithPlayer = placeTile(mapWithPlayer, position, Tile.Item));

  return (
  <div className="map">
    {mapWithPlayer.map((row, key) => <MapRow key={key} tiles={row} />)}
  </div>
  )
};

const mapStateToProps = ({ gameMap, playerPosition }: RootState) => ({
  gameMap: gameMap,
  playerPosition: playerPosition,
});

export default connect(mapStateToProps)(Map);
