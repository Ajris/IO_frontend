import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import RootState, {GameState, Position} from "./rootState";
import {movePlayer, pickItem, setGameState} from "./actions";
import {Direction} from "../model/direction";
import {Tile} from "../model/tile";
import {ItemBonusType} from "../model/itemBonusType";
import {ItemProps} from "../components/inventory/Item";
import {InventoryProps} from "../components/inventory/Inventory";

const allowedTiles = () => [Tile.Floor, Tile.Item]
const getRandomTile = () => (Math.random() > 0.7 ? Tile.Wall : Tile.Item);

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  gameMap: Array.from(Array(5), _ => Array.from(Array(6), _ => getRandomTile())),
  playerPosition: [0, 0],
  opponents: {opponents: [{position: [2, 3], fightFactor: 10}]},
  inventory: {itemProps: [{name: "itemik", color: "red", image: "", bonusType: ItemBonusType.DAMAGE, value: 10},
    {name: "mieczyk", color: "yellow", image: "", bonusType: ItemBonusType.DEFENSE, value: 20}]}
};

const canMoveTo = (map: Tile[][], position: Position): Tile | undefined => {
  const [x, y] = position

  return allowedTiles().find(a => map[x] && map[x][y] === a);
}

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
  switch (canMoveTo(map, newPos)) {
    case Tile.Item:
      pickItem({    name: "XD",
        color: "#000000",
        image: "wow",})
      console.log(newPos)
      return newPos;
    case Tile.Floor:
      return newPos;
    case undefined:
      return position;
    default:
      return position;
  }
}

const changePlayerInventory = (inventory: InventoryProps, item: ItemProps): InventoryProps => {
  return {itemProps: inventory.itemProps.concat(item)}
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
  [pickItem.type]: (state, action: PayloadAction<ItemProps>) => ({
    ...state,
    inventory: changePlayerInventory(state.inventory, action.payload)
  })
});
