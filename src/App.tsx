import React from 'react';
import { MapTileProps } from './components/map/MapTile';
import Map, { TileRowProps } from './components/map/Map';
import './App.css';

const rows: TileRowProps[] =
    [1, 2, 3, 4, 5, 6].map(_ => ({"tiles": [1, 2, 3, 4, 5].map(_ => ({"color": Math.random() > 0.5 ? "violet" : "yellow"} as MapTileProps))} as TileRowProps));

function App() {
  return (
    <div className="App">
      <Map rows={rows}/>
    </div>
  );
}

export default App;
