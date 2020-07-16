import { createAction } from "@reduxjs/toolkit";
import { GameState, Position } from "./rootState";
import { Direction } from "../model/direction";
import {NpcProps} from "../components/npc/Npc";

export const setGameState = createAction<GameState>("setGameState");

export const movePlayer = createAction<Direction>("movePlayer");

export const npcInteract = createAction<NpcProps>("npcInteract");

