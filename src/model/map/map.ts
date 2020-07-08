import Tile, {WallTile, FloorTile} from './tile'
import {PlayerEntry} from './tileEntry'

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
};


class Map {
    tiles: Tile[][];
    renderFun?: (map: Map) => void;
    constructor() {
        this.tiles = [1, 2, 3, 4, 5, 6].map(y => ([1, 2, 3, 4, 5].map(x => (Math.random() > 0.5 ? new WallTile(x, y) : new FloorTile(x, y)))))
    }
    
    placePlayer(player: PlayerEntry) {
        this.tiles[0][0] = new FloorTile(0, 0, player);
        console.log(this.renderFun)
        
        this.renderFun && this.renderFun(this)
    }

    getNewPos(x: number, y: number, direction: Direction): {x: number, y: number} {
        switch(direction) {
            case Direction.UP:
                return {x: x, y: y - 1};
            case Direction.DOWN:
                return {x: x, y: y + 1};
            case Direction.LEFT:
                return {x: x - 1, y: y};
            case Direction.RIGHT:
                return {x: x + 1, y: y};
        }
    }

    movePlayer(player: PlayerEntry, direction: Direction) {
        const playerTile = this.tiles.flat().filter(tile => tile.entry == player)[0]
        const newPos = this.getNewPos(playerTile.x, playerTile.y, direction);
        // console.log(playerTile)
        console.log(newPos)
        // console.log(this.tiles[newPos.x][newPos.y])
        // console.log(this.tiles[newPos.x][newPos.y].canMoveTo())
        if(this.tiles[newPos.x] && this.tiles[newPos.x][newPos.y] && this.tiles[newPos.x][newPos.y].canMoveTo()) {
            this.tiles[newPos.x][newPos.y].placeEntry!(player)
            this.tiles[playerTile.x][playerTile.y].removeEntry!()
            this.renderFun && this.renderFun(this);
        } 
    }
    
    registerRenderFun(renderFun?: (map: Map) => void) {
        this.renderFun = renderFun;
    }
}

export {Direction};
export default Map;
