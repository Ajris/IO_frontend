export enum GameState {
  IN_PROGRESS,
  FINISHED,
}

export default interface RootState {
  gameState: GameState
}
