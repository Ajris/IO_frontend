import React, {useState, useEffect} from 'react';
import TileMap from './components/map/Map';
import { Tile } from './model/map/tile';
import {PlayerEntry} from './model/map/tileEntry';
import Map, {Direction} from './model/map/map';
import './App.css';

function App() {
  const player = new PlayerEntry();

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
