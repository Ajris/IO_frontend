import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import RootState, { GameState, PlayerPosition } from "./rootState";
import { setGameState, movePlayer } from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/map/tile";

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  gameMap: [1, 2, 3, 4, 5, 6].map(
    _ => ([1, 2, 3, 4, 5].map(
      _ => (Math.random() > 0.5 ? Tile.Wall : Tile.Floor)))),
  playerPosition: [0, 0]
};

const positionAfterMovement = (position: PlayerPosition,
  direction: Direction): PlayerPosition => {
  switch(direction) {
      case Direction.UP:
          return [position[0], position[1] - 1];
      case Direction.DOWN:
          return [position[0], position[1] + 1];
      case Direction.LEFT:
          return [position[0] - 1, position[1]];
      case Direction.RIGHT:
          return [position[0] + 1, position[1]];
  }
};

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: positionAfterMovement(state.playerPosition, action.payload)
  })
});