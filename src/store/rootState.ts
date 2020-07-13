import { Tile } from "../model/tile";
import {Opponents} from "../components/opponent/Opponent";
import {InventoryProps} from "../components/inventory/Inventory";
import {ItemProps} from "../components/inventory/Item";

export enum GameState {
  IN_PROGRESS,
  FINISHED
}

export type Position = [number, number];

export default interface RootState {
  gameState: GameState
  gameMap: Tile[][]
  playerPosition: Position
  opponents: Opponents
  inventory: InventoryProps
}
