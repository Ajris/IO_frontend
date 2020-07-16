import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import RootState, { GameState, Position } from "./rootState";
import {setGameState, movePlayer, addItem, deleteItemFromMap} from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";
import {ItemProps} from "../components/inventory/Item";
import {OpponentProps, Opponents} from "../components/opponent/Opponent";
import {NpcProps} from "../components/npc/Npc";
import {EndingConditionsProps} from "../components/ending/EndingConditionsProps";
import config from '../game-config.json';
import {CharacterProps} from "../components/character/Character";

const getGameMap = (encodedMap: string[]) => (
  encodedMap.map(encodedRow => (
    Array.from(encodedRow).map(tile => (tile === "1" ? Tile.Wall : Tile.Floor))
  ))
);

export const initialState: RootState = {
    gameState: GameState.IN_PROGRESS,
    gameMap: getGameMap(config.map),
    playerPosition: config.playerPosition as Position,
    itemsPosition: config.items.map(item => item.position) as Position[],
    itemsOnMap: config.items,
    inventoryItems: [],
    opponents: {opponents: config.mobs},
    npcs: config.npcs,
    endingConditions: config.endingConditions,
    characterProps: config.characterProps,
};

const canMoveTo = (map: Tile[][], position: Position): boolean => {
    const [x, y] = position;
    return map[x] && map[x][y] === Tile.Floor;
};

const isItem = (map: Tile[][], position: Position): boolean => {
    const [x, y] = position;
    return map[x] && map[x][y] === Tile.Item;
};

const positionAfterMovement = (position: Position,
  direction: Direction): Position => {
  switch(direction) {
    case Direction.LEFT:
        return [position[0], position[1] - 1];
    case Direction.RIGHT:
        return [position[0], position[1] + 1];
    case Direction.UP:
        return [position[0] - 1, position[1]];
    case Direction.DOWN:
        return [position[0] + 1, position[1]];
  }
};

const changePlayerPosition = (map: Tile[][], position: Position,
  direction: Direction): Position => {
  const newPos = positionAfterMovement(position, direction);

  if(isItem(map, newPos)){
      return newPos;
  }
  return canMoveTo(map, newPos) ? newPos : position;
};

const addItemToInventory = (inventoryItems: ItemProps[], item: ItemProps) => {
    inventoryItems.push(item);
    return inventoryItems;
}

const isFightWon = (opponents: Opponents, position: Position, characterProps: CharacterProps): boolean => {
    const opponent = opponents.opponents.filter(o => o.position[0] === position[0] && o.position[1] === position[1])[0];

    return characterProps.exp > opponent.fightFactor;
}

const isFight = (opponents: Opponents, position: Position): boolean => {
    return opponents.opponents.filter(o => o.position[0] === position[0] && o.position[1] === position[1]).length !== 0;
}

const deleteItem = (map: Tile[][], items: ItemProps[], itemsPos: Position[], inventoryItems: ItemProps[], newPos: Position) => {
    map[newPos[0]][newPos[1]] = Tile.Floor;
    items.pop();
    itemsPos.pop();
    return map;
}
const fightAndUpdateOpponents = (map: Tile[][], position: Position,
                                 opponents: Opponents, direction: Direction): Opponents => {
    const newPos = positionAfterMovement(position, direction);
    const newOpponents = opponents.opponents.filter(o => o.position[0] !== newPos[0] || o.position[1] !== newPos[1]);
    return {opponents: newOpponents};
}

const fightAndUpdateCharacter = (gameMap: any, position: Position, opponents: Opponents, direction: Direction, characterProps: CharacterProps): CharacterProps => {
    const newPos = positionAfterMovement(position, direction);
    let newExp = characterProps.exp
    let newLifes = characterProps.lifes

    if (isFight(opponents, newPos)) {
        if (isFightWon(opponents, newPos, characterProps)) {
            window.alert("You won fight")
            newExp += 10;
        } else {
            window.alert("You lost fight")
            newLifes -= 1;
        }
    }



    return {
        name: characterProps.name,
        exp: newExp,
        lifes: newLifes,
        inventory: characterProps.inventory
    };
}

const npcInteract = (position: Position, npcs: NpcProps[], direction: Direction): NpcProps[] => {
    const newPos = positionAfterMovement(position, direction);
    const npc = npcs.filter(n => n.position[0] === newPos[0] && n.position[1] === newPos[1])[0];
    if (npc) {
        window.alert(npc.text);
    }
    return npcs;
}

const endingInteract = (position: Position, endingConditionsProps: EndingConditionsProps, inventory: ItemProps[], direction: Direction, characterProps: CharacterProps): EndingConditionsProps => {
    const newPos = positionAfterMovement(position, direction);
    const arr = [...endingConditionsProps.itemConditions]
    const itemOnNewPosition = endingConditionsProps.itemConditions.filter(n => n.position![0] === newPos[0] && n.position![1] === newPos[1])[0]
    if (itemOnNewPosition != undefined) {
        var index = arr.indexOf(itemOnNewPosition);
        arr.splice(index, 1);
    }

    if (characterProps.lifes === 0) {
        window.alert("LOST")
    }

    if (arr && arr.length == 0) {
        window.alert("WIN")
    }


    return {itemConditions: arr};
}

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
      ...state,
      playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload),
      characterProps: fightAndUpdateCharacter(state.gameMap, state.playerPosition, state.opponents, action.payload, state.characterProps),
      opponents: fightAndUpdateOpponents(state.gameMap, state.playerPosition, state.opponents, action.payload),
      npcs: npcInteract(state.playerPosition, state.npcs, action.payload),
      endingConditions: endingInteract(state.playerPosition, state.endingConditions, state.inventoryItems, action.payload, state.characterProps)
  }),
  [deleteItemFromMap.type]: (state, action: PayloadAction<Position>) => void ({
    ...state,
    gameMap: deleteItem(state.gameMap, state.itemsOnMap, state.itemsPosition, state.inventoryItems, action.payload)
  }),
  [addItem.type]: (state, action: PayloadAction<ItemProps>) => void ({
      ...state,
      inventoryItems: addItemToInventory(state.inventoryItems, action.payload)
  })
});
