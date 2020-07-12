import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import {Tile} from "../../model/tile";
import RootState, {Position} from "../../store/rootState";
import {Opponents} from "../opponent/Opponent";

interface MapProps {
    gameMap: Tile[][],
    playerPosition: Position,
    opponents: Opponents
}

const placePlayer = (gameMap: Tile[][], playerPosition: Position) => {
  var clonedMap = gameMap.map(arr  => arr.slice());
  clonedMap[playerPosition[0]][playerPosition[1]] = Tile.Player;
  return clonedMap;
};

const placeItem = (gameMap: Tile[][], playerPosition: Position) => {
    var clonedMap = gameMap.map(function (arr) {
        return arr.slice();
    });
    clonedMap[playerPosition[0]][playerPosition[1]] = Tile.Item;
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


const Map = ({gameMap, playerPosition, opponents}: MapProps) => {
    let mapWithPlayer = placePlayer(gameMap, playerPosition);
    let mapWithItem = placeItem(mapWithPlayer, [2, 2])
    let mapWithOpponent = placeOpponents(mapWithItem, opponents)
    return (
        <div className="map">
            {mapWithOpponent.map(row => <MapRow tiles={row}/>)}
        </div>
    )
};

const mapStateToProps = ({gameMap, playerPosition, opponents}: RootState) => ({
    gameMap: gameMap,
    playerPosition: playerPosition,
    opponents: opponents
});

export default connect(mapStateToProps)(Map);
