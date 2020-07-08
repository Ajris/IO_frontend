export enum State {
  IN_PROGRESS,
  FINISHED,
}

export default interface RootState {
  state: State
}
