import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import { Tile } from "../../model/tile";
import RootState, { PlayerPosition } from "../../store/rootState";

interface MapProps {
  gameMap: Tile[][],
  playerPosition: PlayerPosition,
}

const placePlayer = (gameMap: Tile[][], playerPosition: PlayerPosition) => {
  var clonedMap = gameMap.map(function(arr) {
      return arr.slice();
  });
  clonedMap[playerPosition[0]][playerPosition[1]] = Tile.Player;
  return clonedMap;
}

const Map = ({ gameMap, playerPosition }: MapProps) => {
  let mapWithPlayer = placePlayer(gameMap, playerPosition);
  return (
  <div className="map">
    {mapWithPlayer.map(row => <MapRow tiles={row} />)}
  </div>
  )
}

const mapStateToProps = ({ gameMap, playerPosition }: RootState) => ({
  gameMap: gameMap,
  playerPosition: playerPosition,
});

export default connect(mapStateToProps)(Map);
