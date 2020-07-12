import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import RootState, { GameState, Position } from "./rootState";
import { setGameState, movePlayer } from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";
import {OpponentProps, Opponents} from "../components/opponent/Opponent";

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
  if (canMoveTo(map, newPos)) {
      return newPos;
  } else {
    return position;
  }
}

const isFight = (opponents: Opponents, position: Position): boolean => {
  const [x, y] = position
  return opponents.opponents.filter(o => o.position[0] === x && o.position[1] === y).length !== 0
}

const fightAndUpdateOpponents = (position: Position,
                         opponents: Opponents, direction: Direction): Opponents => {
    const newPos = positionAfterMovement(position, direction);

    const newOpponents = opponents.opponents.filter(o => o.position[0] !== newPos[0] || o.position[1] !== newPos[1]);
    return {opponents: newOpponents}
}

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload),
    opponents: fightAndUpdateOpponents(state.playerPosition, state.opponents, action.payload)
  })
});
