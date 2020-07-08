enum State {
  IN_PROGRESS,
  FINISHED,
}

export default interface GameState {
  state: State
}
