import { Tile } from './tile'

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
};

class Map {
    tiles: Tile[][];
    constructor() {
        this.tiles = [1, 2, 3, 4, 5, 6].map(y => ([1, 2, 3, 4, 5].map(x => (Math.random() > 0.5 ? new WallTile(x, y) : new FloorTile(x, y)))))
    }

  movePlayer(direction: Direction) {
  }
}

export default Map;
