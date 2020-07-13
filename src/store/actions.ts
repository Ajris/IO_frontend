import { createAction } from "@reduxjs/toolkit";
import { GameState, Position } from "./rootState";
import { Direction } from "../model/direction";
import {ItemProps} from "../components/inventory/Item";

export const setGameState = createAction<GameState>("setGameState");

export const deleteItemFromMap = createAction<Position>("deleteItemFromMap");

export const movePlayer = createAction<Direction>("movePlayer");

export const addItem = createAction<ItemProps>("addItem");

