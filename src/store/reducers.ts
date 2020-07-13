import {createReducer, PayloadAction, createStore} from "@reduxjs/toolkit";
import RootState, { GameState, Position } from "./rootState";
import {setGameState, movePlayer, addItem, deleteItemFromMap} from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";
import {ItemProps} from "../components/inventory/Item";

const getRandomTile = () => (Math.random() > 0.7 ? Tile.Wall : Tile.Floor);

const getGameMap = (itemPositions: Position[]) => {
  const map: (Tile.Floor | Tile.Wall | Tile.Item)[][] = Array.from(Array(5), _ => Array.from(Array(6), _ => getRandomTile()));
  itemPositions.forEach(position => {
    const[x, y] = position;
    map[x][y] = Tile.Item;
  });

  return map;
}

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  gameMap: getGameMap([[2,2]]),
  playerPosition: [0, 0],
  itemsPosition: [[2,2]],
  inventoryItems: []
};

const canMoveTo = (map: Tile[][], position: Position): boolean => {
    const [x, y] = position;
    return map[x] && map[x][y] === Tile.Floor;
};

const isItem = (map: Tile[][], position: Position): boolean => {
    const [x, y] = position;
    return map[x] && map[x][y] === Tile.Item;
};

const positionAfterMovement = (position: Position,
  direction: Direction): Position => {
  switch(direction) {
    case Direction.LEFT:
        return [position[0], position[1] - 1];
    case Direction.RIGHT:
        return [position[0], position[1] + 1];
    case Direction.UP:
        return [position[0] - 1, position[1]];
    case Direction.DOWN:
        return [position[0] + 1, position[1]];
  }
};

const changePlayerPosition = (map: Tile[][], position: Position,
  direction: Direction): Position => {
  const newPos = positionAfterMovement(position, direction);
  if(isItem(map, newPos)){
      return newPos;
  }
  return canMoveTo(map, newPos) ? newPos : position;
};

const addItemToInventory = (inventoryItems: ItemProps[], item: ItemProps) => {
    inventoryItems.push(item);
    return inventoryItems;
}

const deleteItem = (map: Tile[][], itemsPos: Position[], newPos: Position) => {
    var tile: Tile = map[newPos[0]][newPos[1]]
    
    map[newPos[0]][newPos[1]] = Tile.Floor;
    itemsPos.pop()
    
    return map;
}


export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload)
  }),
  [deleteItemFromMap.type]: (state, action: PayloadAction<Position>) => void ({
    ...state,
    gameMap: deleteItem(state.gameMap, state.itemsPosition, action.payload)
  }),
  [addItem.type]: (state, action: PayloadAction<ItemProps>) => ({
      ...state,
      inventoryItems: addItemToInventory(state.inventoryItems, action.payload)
  })
});
