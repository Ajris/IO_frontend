import React from 'react';
import Map, {MapProps} from '../map/Map'
import Inventory, {InventoryProps} from "../inventory/Inventory";
import Character, {CharacterProps} from "../character/Character";
import Location, {LocationProps} from "../location/Location";

export interface MainLayoutProps {
    mapProps: MapProps;
    inventoryProps: InventoryProps;
    characterProps: CharacterProps;
    locationProps: LocationProps;
};

const MainLayout = (mainLayoutProps: MainLayoutProps) => {
    return (
    <div className="main-layout">
        <Map {...mainLayoutProps.mapProps}/>
        <div>
            <Character {...mainLayoutProps.characterProps}/>
            <Inventory {...mainLayoutProps.inventoryProps}/>
            <Location {...mainLayoutProps.locationProps}/>
        </div>
    </div>
    )
}

export default MainLayout;
