import { Tile } from "../model/map/tile";

export enum GameState {
  IN_PROGRESS,
  FINISHED
}

export type PlayerPosition = [number, number];

export default interface RootState {
  gameState: GameState
  gameMap: Tile[][]
  playerPosition: PlayerPosition
}
