import {Position} from "../../store/rootState";

export interface Opponents {
    opponents: OpponentProps[];
}

export interface OpponentProps {
    position: number[]
    fightFactor: number
}
