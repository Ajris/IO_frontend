import {Opponents} from "../components/opponent/Opponent";
import {ItemProps} from "../components/inventory/Item";
import {NpcProps} from "../components/npc/Npc";
import {Tile} from "../model/tile";
import {EndingConditionsProps} from "../components/ending/EndingConditionsProps";
import {CharacterProps} from "../components/character/Character";
import {Items} from "./reducers";

export enum GameState {
  IN_PROGRESS,
  FINISHED
}

export type Position = [number, number];

export default interface RootState {
  gameState: GameState;
  gameMap: Tile[][];
  playerPosition: Position;
  items: Items;
  opponents: Opponents;
  npcs: NpcProps[];
  endingConditions: EndingConditionsProps;
  characterProps: CharacterProps;
}
