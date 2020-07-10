import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import RootState, { GameState, PlayerPosition } from "./rootState";
import { setGameState, movePlayer } from "./actions";
import { Direction } from "../model/direction";
import { Tile } from "../model/tile";

const getRandomTile = () => (Math.random() > 0.7 ? Tile.Wall : Tile.Floor);

export const initialState: RootState = {
  gameState: GameState.IN_PROGRESS,
  gameMap: Array.from(Array(5), _ => Array.from(Array(6), _ => getRandomTile())),
  playerPosition: [0, 0]
};

const canMoveTo = (map: Tile[][], position: PlayerPosition): boolean => {
    const [x, y] = position
    return map[x] && map[x][y] === Tile.Floor;
}

const positionAfterMovement = (map: Tile[][], position: PlayerPosition,
  direction: Direction): PlayerPosition => {
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

const changePlayerPosition = (map: Tile[][], position: PlayerPosition,
  direction: Direction): PlayerPosition => {
  const newPos = positionAfterMovement(map, position, direction);
  return canMoveTo(map, newPos) ? newPos : position;
}

export const rootReducer = createReducer(initialState, {
  [setGameState.type]: (state, action: PayloadAction<GameState>) => ({
    ...state,
    gameState: action.payload
  }),
  [movePlayer.type]: (state, action: PayloadAction<Direction>) => ({
    ...state,
    playerPosition: changePlayerPosition(state.gameMap, state.playerPosition, action.payload)
  })
});
