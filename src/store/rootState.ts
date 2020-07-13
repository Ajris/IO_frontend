import { Tile } from "../model/tile";
import {ItemProps} from "../components/inventory/Item";
import {Opponents} from "../components/opponent/Opponent";

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
