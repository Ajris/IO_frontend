import RootState, { State } from "./rootState";
import { createReducer } from "@reduxjs/toolkit";

export const initialState: RootState = {
  state: State.IN_PROGRESS,
};

