import React, {useState} from 'react';
import { MapTileProps } from './components/map/MapTile';
import Map, { TileRowProps } from './components/map/Map';
import './App.css';
import Tile, {WallTile, FloorTile} from './model/map/tile'

const tiles = (): Tile[][] =>
    [1, 2, 3, 4, 5, 6].map(_ => ([1, 2, 3, 4, 5].map(_ => (Math.random() > 0.5 ? new WallTile() : new FloorTile()))))

                                 
const rows_init = (): TileRowProps[] =>
    tiles().map(row => ({"tiles": row.map(tile => ({"color": tile.color} as MapTileProps))} as TileRowProps));

function App() {
  const [rows, setRows] = useState(rows_init())
  return (
    <div className="App">
      <button onClick={() => setRows(rows_init())}/>
      <Map rows={rows}/>
    </div>
  );
}

export default App;
