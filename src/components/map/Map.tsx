import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import { Tile } from "../../model/tile";
import RootState, { Position } from "../../store/rootState";
import {Opponents} from "../opponent/Opponent";
import {NpcProps} from "../npc/Npc";
import {Items} from "../../store/reducers";

interface MapProps {
  gameMap: Tile[][],
  playerPosition: Position,
  items: Items,
  opponents: Opponents,
  npcs: NpcProps[];
}

const placeTile = (gameMap: Tile[][], position: Position, tileType: Tile) => {
  const clonedMap = gameMap.map(arr => arr.slice());
  clonedMap[position[0]][position[1]] = tileType;
  return clonedMap;
};

const placeOpponents = (gameMap: Tile[][], opponents: Opponents) => {
    var clonedMap = gameMap.map(function (arr) {
        return arr.slice();
    });

    opponents.opponents.forEach(opponent =>
        clonedMap[opponent.position[0]][opponent.position[1]] = Tile.Opponent
    )

    return clonedMap;
};

const placeNpcs = (gameMap: Tile[][], npcs: NpcProps[]) => {
    var clonedMap = gameMap.map(function (arr) {
        return arr.slice();
    });

    npcs.forEach(npc =>
        clonedMap[npc.position[0]][npc.position[1]] = Tile.Npc
    )

    return clonedMap;
};

const Map = ({ gameMap, playerPosition, items, opponents, npcs}: MapProps) => {
  let mapWithPlayer = placeTile(gameMap, playerPosition, Tile.Player);
  items.itemsOnMap.forEach(item => mapWithPlayer = placeTile(mapWithPlayer, [item.position!![0], item.position!![1]], Tile.Item));
  items.chests.forEach(chest => mapWithPlayer = placeTile(mapWithPlayer, chest.position, Tile.Chest));

    let mapWithOpponent = placeOpponents(mapWithPlayer, opponents)
    const mapWithNpcXd = placeNpcs(mapWithOpponent, npcs)
  return (
  <div className="map">
    {mapWithNpcXd.map(row => <MapRow tiles={row} />)}
  </div>
  )
};



const mapStateToProps = ({ gameMap, playerPosition, items, opponents, npcs }: RootState) => ({
  gameMap: gameMap,
  playerPosition: playerPosition,
  items: items,
  opponents: opponents,
  npcs: npcs
});


export default connect(mapStateToProps)(Map);
