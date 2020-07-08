import { createAction } from "@reduxjs/toolkit";
import { GameState } from "./rootState";
import { Direction } from "../model/direction";

export const setGameState = createAction<GameState>("setGameState");

export const movePlayer = createAction<Direction>("movePlayer");

