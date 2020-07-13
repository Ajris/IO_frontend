import { createAction } from "@reduxjs/toolkit";
import { GameState } from "./rootState";
import { Direction } from "../model/direction";
import {ItemProps} from "../components/inventory/Item";

export const setGameState = createAction<GameState>("setGameState");

export const movePlayer = createAction<Direction>("movePlayer");

export const pickItem = createAction<ItemProps>("pickItem");