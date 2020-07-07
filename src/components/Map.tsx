import React from 'react';
import MapTile, {MapTileProps} from './MapTile'

interface TileRowProps {
    tiles: MapTileProps[];
};

const TileRow = ({tiles}: TileRowProps) => {
    return (
    <>
    {tiles.map(tile => <MapTile color={tile.color}/>)}
    </>
    )
}

const Map = (tiles: MapTileProps[][]) => (
    tiles.map(row => <TileRow tiles={row}/>) 
)

export default Map;
