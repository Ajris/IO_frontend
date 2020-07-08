import { AnyAction, Dispatch as OldDispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import RootState from "./rootState";

export type Dispatch = ThunkDispatch<RootState, void, AnyAction> & OldDispatch;
