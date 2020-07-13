import {Opponents} from "../components/opponent/Opponent";
import {ItemProps} from "../components/inventory/Item";
import {Tile} from "../model/tile";

export enum GameState {
  IN_PROGRESS,
  FINISHED
}

export type Position = [number, number];

export default interface RootState {
  gameState: GameState;
  gameMap: Tile[][];
  playerPosition: Position;
  itemsPosition: Position[];
  itemsOnMap: ItemProps[];
  inventoryItems: ItemProps[];
  opponents: Opponents
}
