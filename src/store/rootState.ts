export enum GameState {
  IN_PROGRESS,
  FINISHED,
}

export type PlayerPosition = [number, number];

export default interface RootState {
  gameState: GameState
  playerPosition: PlayerPosition
}
