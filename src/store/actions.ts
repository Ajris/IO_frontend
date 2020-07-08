import { createAction } from "@reduxjs/toolkit";
import { GameState } from "./rootState";

export const setGameState = createAction<GameState>("setGameState");
