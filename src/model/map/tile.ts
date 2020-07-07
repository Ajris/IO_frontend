interface Tile {
    canMoveTo: () => boolean;
    color: string;
};

class WallTile implements Tile {
    canMoveTo = () => false;
    color = 'violet'
}

class FloorTile implements Tile {
    canMoveTo = () => true;
    color = 'yellow'
}

export { WallTile, FloorTile};
export default Tile;
