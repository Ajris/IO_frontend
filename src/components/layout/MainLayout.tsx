import React from 'react';
import Map, {MapProps} from '../map/Map'
import Inventory, {InventoryProps} from "../inventory/Inventory";
import Character, {CharacterProps} from "../character/Character";

export interface MainLayoutProps {
    mapProps: MapProps;
    inventoryProps: InventoryProps;
    characterProps: CharacterProps;
};

const MainLayout = (mainLayoutProps: MainLayoutProps) => {
    return (
    <div className="main-layout">
        <Map {...mainLayoutProps.mapProps}/>
        <div>
            <Character {...mainLayoutProps.characterProps}/>
            <Inventory {...mainLayoutProps.inventoryProps}/>
        </div>
    </div>
    )
}

export default MainLayout;
