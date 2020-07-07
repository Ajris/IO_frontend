import React from 'react';
import { MapTileProps } from './components/map/MapTile'
import Map, { TileRowProps } from './components/map/Map'

const rows: TileRowProps[] =
  [1, 2, 3, 4, 5, 6].map(_ => ({"tiles": [1, 2, 3, 4, 5].map(_ => ({"color": "black"} as MapTileProps))} as TileRowProps));

function App() {
  return (
    <div className="App">
      <p>Start</p>
      <Map rows={rows}/>
    </div>
  );
}

export default App;
