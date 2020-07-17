import React from 'react';
import Map from '../map/Map'
import Inventory from "../inventory/Inventory";
import Character, {CharacterProps} from "../character/Character";
import Location, {LocationProps} from "../location/Location";
import RootState, { Position } from "../../store/rootState";
import { connect } from 'react-redux';
import {Items} from "../../store/reducers";

export interface MainLayoutProps {
    inventoryProps: Items;
    characterProps: CharacterProps;
    locationProps: LocationProps;
};

const MainLayout = (mainLayoutProps: MainLayoutProps) => {
    return (
    <div className="main-layout">
        <Map/>
        <div>
            <Character {...mainLayoutProps.characterProps}/>
            <Inventory {...mainLayoutProps.inventoryProps}/>
            <Location {...mainLayoutProps.locationProps}/>
        </div>
    </div>
    )
}

const mapStateToProps = ({ characterProps, items }: RootState) => ({
    characterProps: characterProps,
    inventoryProps: items,
  });

export default connect(mapStateToProps)(MainLayout);
