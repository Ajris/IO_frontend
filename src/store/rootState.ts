import { Tile } from "../model/tile";
import {ItemProps} from "../components/inventory/Item";

export enum GameState {
  IN_PROGRESS,
  FINISHED
}

export type Position = [number, number];

export default interface RootState {
  gameState: GameState;
  gameMap: Tile[][];
  playerPosition: Position;
  inventoryItems: ItemProps[];
}
