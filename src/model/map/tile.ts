import TileEntry, {EmptyEntry} from './tileEntry'

interface Tile {
    canMoveTo: () => boolean;
    color: string;
    x: number;
    y: number;
    entry?: TileEntry;
    placeEntry?: (entry: TileEntry) => void;
    removeEntry?: () => void;
};

class WallTile implements Tile {
    canMoveTo = () => false;
    color = 'violet';
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class FloorTile implements Tile {
    canMoveTo = () => true;
    oldEntry?: TileEntry;
    entry?: TileEntry;
    x: number;
    y: number;

    constructor(x: number, y: number, entry?: TileEntry) {
        this.x = x;
        this.y = y;
        this.entry = entry;
    }

    placeEntry = (entry: TileEntry) => {
        this.oldEntry = this.entry;
        this.entry = entry;
    }

    removeEntry = () => {
        this.entry = this.oldEntry || undefined;
    }

    item = EmptyEntry;
    color = 'yellow';
}

export { WallTile, FloorTile};
export default Tile;
