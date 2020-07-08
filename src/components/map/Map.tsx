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
    <div className="map-row">
        {tiles.map(tile => <MapTile icon={tile.icon && tile.icon} color={tile.color}/>)}
    </div>
    )
}

const Map = ({rows}: MapProps) => {
    console.log(rows)
    return (
    <div className="map">
        {rows.map(row => <TileRow tiles={row.tiles}/>)}
    </div>
    )
}

export default Map;
