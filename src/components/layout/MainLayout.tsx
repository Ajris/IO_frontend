import React from 'react';
import Map from '../map/Map'
import Inventory from "../inventory/Inventory";
import Character from "../character/Character";
import {CharacterProps} from "../character/Character";
import Location, {LocationProps} from "../location/Location";

export interface MainLayoutProps {
    characterProps: CharacterProps;
    locationProps: LocationProps;
};

const MainLayout = (mainLayoutProps: MainLayoutProps) => {
    return (
    <div className="main-layout">
        <Map />
        <div>
            <Character {...mainLayoutProps.characterProps}/>
            <Inventory {...mainLayoutProps.characterProps.inventory}/>
            <Location {...mainLayoutProps.locationProps}/>
        </div>
    </div>
    )
}

export default MainLayout;
