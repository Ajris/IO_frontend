import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import { Tile } from "../../model/tile";
import RootState, { Position } from "../../store/rootState";
import { deleteItemFromMap, addItem, npcInteract} from "../../store/actions";
import { Dispatch } from "../../store";
import { ItemProps } from "../inventory/Item";
import { MainLayoutProps } from "../layout/MainLayout";
import {Opponents} from "../opponent/Opponent";
import {NpcProps} from "../npc/Npc";
        
interface MapProps {
  gameMap: Tile[][],
  playerPosition: Position,
  itemsPosition: Position[],
  itemsOnMap: ItemProps[],
  itemsInInv: ItemProps[],
  opponents: Opponents,
  changeMap: (newPosition: Position) => void;
  addToInventory: (item: ItemProps) => void;
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

const Map = ({ gameMap, playerPosition, itemsPosition, itemsOnMap, changeMap, addToInventory, opponents, npcs }: MapProps) => {
  let mapWithPlayer = placeTile(gameMap, playerPosition, Tile.Player);
  itemsPosition.forEach(position => mapWithPlayer = placeTile(mapWithPlayer, position, Tile.Item));
  itemsOnMap.forEach(item => {
        var position = item.position;
        if(position !== undefined){
            if(position[0] === playerPosition[0] && position[1] === playerPosition[1]) {
                changeMap(playerPosition);
                addToInventory(item);
            }
        }
    });
    
    let mapWithOpponent = placeOpponents(mapWithPlayer, opponents)
    const mapWithNpcXd = placeNpcs(mapWithOpponent, npcs)
  return (
  <div className="map">
    {mapWithNpcXd.map(row => <MapRow tiles={row} />)}
  </div>
  )
};

const mapStateToProps = ({ gameMap, playerPosition, itemsPosition, itemsOnMap, inventoryItems, opponents, npcs }: RootState) => ({
  gameMap: gameMap,
  playerPosition: playerPosition,
  itemsPosition: itemsPosition,
  itemsOnMap: itemsOnMap,
  itemsInInv: inventoryItems,
  opponents: opponents,
  npcs: npcs
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeMap: (newPosition: Position) => {
      dispatch(deleteItemFromMap(newPosition));
    },
    addToInventory: (item: ItemProps) => {
        dispatch(addItem(item));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
