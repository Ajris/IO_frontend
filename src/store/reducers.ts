import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import RootState, { GameState, Position } from "./rootState";
import { setGameState, movePlayer } from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";
import {Opponents} from "../components/opponent/Opponent";

const getRandomTile = () => (Math.random() > 0.7 ? Tile.Wall : Tile.Floor);

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  gameMap: Array.from(Array(5), _ => Array.from(Array(6), _ => getRandomTile())),
  playerPosition: [0, 0],
  opponents: {opponents: [{position: [2, 3], fightFactor: 10}]}
};

const canMoveTo = (map: Tile[][], position: Position): boolean => {
  const [x, y] = position
  return map[x] && map[x][y] === Tile.Floor;
}

const isFight = (opponents: Opponents, position: Position): boolean => {
  const [x, y] = position
  return opponents.opponents.filter(o => o.position[0] === x && o.position[1] === y).length !== 0
}

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

// move to the proper position
const fight = (opponents: Opponents, position: Position): boolean => {
  const [x, y] = position;
  let opponentFightFactor = opponents.opponents.filter(o => o.position[0] === x && o.position[1] === y)[0].fightFactor;
  opponents.opponents = opponents.opponents.filter(o => o.position[0] !== x || o.position[1] !== y);
  return true;
}


const changePlayerPosition = (map: Tile[][], position: Position,
  direction: Direction, opponents: Opponents): Position => {
  const newPos = positionAfterMovement(position, direction);
  if (canMoveTo(map, newPos)) {
    if (isFight(opponents, newPos)) {
      fight(opponents, newPos);
      return newPos;
    }
    else {
      return newPos;
    }
  } else {
    return position;
  }
}

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload, state.opponents)
  })
});
