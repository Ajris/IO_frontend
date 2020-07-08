import React, {useState} from 'react';
import {MapTileProps} from './components/map/MapTile';
import {TileRowProps} from './components/map/Map';
import './App.css';
import Tile, {FloorTile, WallTile} from './model/map/tile'
import MainLayout from "./components/layout/MainLayout";

const tiles = (): Tile[][] =>
    [1, 2, 3, 4, 5, 6].map(_ => ([1, 2, 3, 4, 5].map(_ => (Math.random() > 0.5 ? new WallTile() : new FloorTile()))))


const rows_init = (): TileRowProps[] =>
    tiles().map(row => ({"tiles": row.map(tile => ({"color": tile.color} as MapTileProps))} as TileRowProps));

function App() {
    const [rows, setRows] = useState(rows_init());
    const mapProps = {rows: rows}
    const inventoryProps = {name: "Inventory"}
    const characterProps = {name: "Character"}
    const locationProps = {name: "Location"}

    return (
        <div className="App">
            Fighter D17
            <MainLayout mapProps={mapProps}
                        inventoryProps={inventoryProps}
                        characterProps={characterProps}
            locationProps={locationProps}/>
            <button className="btn success" onClick={() => setRows(rows_init())}>RESET MAP</button>
        </div>
    );
}

export default App;
