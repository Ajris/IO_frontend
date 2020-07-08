import React, {useState, useEffect} from 'react';
import { MapTileProps } from './components/map/MapTile';
import TileMap, { TileRowProps } from './components/map/Map';
import './App.css';
import Tile, {WallTile, FloorTile} from './model/map/tile'
import {PlayerEntry} from './model/map/tileEntry'
import Map, {Direction} from './model/map/map'

                                 
const rows_init = (map: Map): TileRowProps[] =>
    map.tiles.map(row => ({"tiles": row.map(tile => ({"color": tile.color, "icon": tile.entry && tile.entry.icon} as MapTileProps))} as TileRowProps));


function App() {
  const [map, setMap] = useState(new Map());
  const player = new PlayerEntry();

  useEffect(() => {
      map.registerRenderFun(setMap)
      map.placePlayer(player);
  });

  const [rows, _] = useState(rows_init(map))
  return (
    <div className="App">
      <button onClick={() => map.movePlayer(player, Direction.UP)}/>
      <button onClick={() => map.movePlayer(player, Direction.DOWN)}/>
      <button onClick={() => map.movePlayer(player, Direction.LEFT)}/>
      <button onClick={() => map.movePlayer(player, Direction.RIGHT)}/>
      <TileMap rows={rows}/>
    </div>
  );
}

export default App;
