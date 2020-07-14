
import {createReducer, PayloadAction, createStore} from "@reduxjs/toolkit";
import RootState, { GameState, Position } from "./rootState";
import {setGameState, movePlayer, addItem, deleteItemFromMap} from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";
import {ItemProps} from "../components/inventory/Item";
import {OpponentProps, Opponents} from "../components/opponent/Opponent";
import {NpcProps} from "../components/npc/Npc";

const getRandomTile = () => (Math.random() > 0.7 ? Tile.Wall : Tile.Floor);

const getGameMap = (itemPositions: Position[]) => {
  const map: (Tile.Floor | Tile.Wall | Tile.Item)[][] = Array.from(Array(7), _ => Array.from(Array(7), _ => getRandomTile()));
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
  itemsOnMap: [{name: "itemik", color: "red", position: [2,2]}],
  inventoryItems: [],
  opponents: {opponents: [{position: [2, 3], fightFactor: 10}]},
  npcs: [{position: [4, 4], text: "Hello!"}]
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

const isFight = (opponents: Opponents, position: Position): boolean => {
  const [x, y] = position
  return opponents.opponents.filter(o => o.position[0] === x && o.position[1] === y).length !== 0
}

const deleteItem = (map: Tile[][], items: ItemProps[], itemsPos: Position[], inventoryItems: ItemProps[], newPos: Position) => {
    map[newPos[0]][newPos[1]] = Tile.Floor;
    items.pop();
    itemsPos.pop();
    
    return map;
}
const fightAndUpdateOpponents = (position: Position,
                         opponents: Opponents, direction: Direction): Opponents => {
    const newPos = positionAfterMovement(position, direction);

    const newOpponents = opponents.opponents.filter(o => o.position[0] !== newPos[0] || o.position[1] !== newPos[1]);
    return {opponents: newOpponents}
}

const npcInteract = (position: Position, npcs: NpcProps[], direction:Direction): NpcProps[] => {
    const newPos = positionAfterMovement(position, direction);
    const npc = npcs.filter(n => n.position[0] === newPos[0] && n.position[1] === newPos[1])[0];
    if(npc) {
        window.alert(npc.text);
    }
    return npcs;
}

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload),
    opponents: fightAndUpdateOpponents(state.playerPosition, state.opponents, action.payload),
    npcs: npcInteract(state.playerPosition, state.npcs, action.payload)
  }),
  [deleteItemFromMap.type]: (state, action: PayloadAction<Position>) => void ({
    ...state,
    gameMap: deleteItem(state.gameMap, state.itemsOnMap, state.itemsPosition, state.inventoryItems, action.payload)
  }),
  [addItem.type]: (state, action: PayloadAction<ItemProps>) => void ({
      ...state,
      inventoryItems: addItemToInventory(state.inventoryItems, action.payload)
  })
});
