import {createAction, createReducer, PayloadAction, createStore} from "@reduxjs/toolkit";

import RootState, { GameState, Position } from "./rootState";
import {setGameState, movePlayer, addItem} from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";
import {ItemProps} from "../components/inventory/Item";
import {ItemBonusType} from "../model/itemBonusType";

const getRandomTile = () => (Math.random() > 0.7 ? Tile.Wall : Tile.Floor);

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  gameMap: Array.from(Array(5), _ => Array.from(Array(6), _ => getRandomTile())),
  playerPosition: [0, 0],
  inventoryItems: []
};

const canMoveTo = (map: Tile[][], position: Position): boolean => {
    const [x, y] = position;
    return map[x] && map[x][y] === Tile.Floor;
};

// TODO fix this function - it never returned 3 - Tile.Item :(
// if it does then maybe item would be added to initialState inventoryItems - if not then we need to do this in another way
const isItem = (map: Tile[][], position: Position): boolean => {
    console.log("calling is item");
    const [x, y] = position;
    console.log(map[x][y]);
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
      console.log("AAA");
      store.dispatch(addItem({name: "itemik", color: "red", image: "", bonusType: ItemBonusType.DAMAGE, value: 10}));
      return newPos;
  }
  return canMoveTo(map, newPos) ? newPos : position;
};

const addItemToInventory = (inventoryItems: ItemProps[], item: ItemProps): ItemProps[] => {
    inventoryItems.push(item);
    console.log(inventoryItems);
    return inventoryItems;
};


export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload)
  }),
  [addItem.type]: (state, action: PayloadAction<ItemProps>) => ({
      ...state,
      inventoryItems: addItemToInventory(state.inventoryItems, action.payload)
  })
});

const store = createStore(rootReducer, initialState);
