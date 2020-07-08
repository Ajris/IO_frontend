import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import RootState, { GameState } from "./rootState";
import { setGameState } from "./actions";

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
};

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  })
});
