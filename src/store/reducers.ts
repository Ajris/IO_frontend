import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import RootState, { GameState, PlayerPosition } from "./rootState";
import { setGameState, movePlayer } from "./actions";
import { Direction } from "../model/direction";

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  playerPosition: [0, 0]
};

const positionAfterMovement = (position: PlayerPosition,
  direction: Direction): PlayerPosition => {
  return position;
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
