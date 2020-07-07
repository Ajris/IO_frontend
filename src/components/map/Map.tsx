import React from 'react';
import MapTile, {MapTileProps} from './MapTile'

export interface TileRowProps {
    tiles: MapTileProps[];
};

export interface MapProps {
    rows: TileRowProps[];
};

const TileRow = ({tiles}: TileRowProps) => {
    return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
    {tiles.map(tile => <MapTile color={tile.color}/>)}
    </div>
    )
}

const Map = ({rows}: MapProps) => {
    console.log(rows)
    return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        {rows.map(row => <TileRow tiles={row.tiles}/>)}
    </div>
    )
}

export default Map;
