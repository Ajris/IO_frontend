import {Opponents} from "../components/opponent/Opponent";
import {ItemProps} from "../components/inventory/Item";
import {NpcProps} from "../components/npc/Npc";
import {Tile} from "../model/tile";
import {EndingConditionsProps} from "../components/ending/EndingConditionsProps";
import {CharacterProps} from "../components/character/Character";

export enum GameState {
  IN_PROGRESS,
  FINISHED
}

export type Position = [number, number];

export default interface RootState {
  gameState: GameState;
  gameMap: Tile[][];
  playerPosition: Position;
  itemsPosition: Position[];
  itemsOnMap: ItemProps[];
  inventoryItems: ItemProps[];
  opponents: Opponents;
  npcs: NpcProps[];
  endingConditions: EndingConditionsProps;
  characterProps: CharacterProps;
}
