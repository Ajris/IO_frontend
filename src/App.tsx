import React from 'react';
import {MapTileProps} from './components/MapTile'
import {TileRowProps} from './components/MapTile'

const tiles: TileRowProps[] = 
    Array(5).map(_ => Array(10).map(_ => <MapTileProps> {color: 'black'}));

function App() {
  return (
    <div className="App">
      <p>Start</p>
      <Map />
    </div>
  );
}

export default App;
