import React, {useEffect, useState} from 'react';
import {MapTileProps} from './components/map/MapTile';
import {TileRowProps} from './components/map/Map';
import './App.css';
import {PlayerEntry} from './model/map/tileEntry'
import Map, {Direction} from './model/map/map'
import MainLayout from "./components/layout/MainLayout";


const rows_init = (map: Map): TileRowProps[] =>
    map.tiles.map(row => ({
        "tiles": row.map(tile => ({
            "color": tile.color,
            "icon": tile.entry && tile.entry.icon
        } as MapTileProps))
    } as TileRowProps));


function App() {
    const [map, setMap] = useState(new Map());
    const player = new PlayerEntry();

    useEffect(() => {
        map.registerRenderFun(setMap)
        map.placePlayer(player);
    });

    const [rows, _] = useState(rows_init(map))
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

            <button onClick={() => map.movePlayer(player, Direction.UP)}/>
            <button onClick={() => map.movePlayer(player, Direction.DOWN)}/>
            <button onClick={() => map.movePlayer(player, Direction.LEFT)}/>
            <button onClick={() => map.movePlayer(player, Direction.RIGHT)}/>
        </div>
    );
}

export default App;
