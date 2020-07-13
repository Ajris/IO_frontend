import React from 'react';
import Map from '../map/Map'
import Inventory from "../inventory/Inventory";
import Character, {CharacterProps} from "../character/Character";
import Location, {LocationProps} from "../location/Location";
import RootState, { Position } from "../../store/rootState";
import { ItemProps } from '../inventory/Item';
import { connect } from 'react-redux';

export interface MainLayoutProps {
    inventoryProps: ItemProps[];
    characterProps: CharacterProps;
    locationProps: LocationProps;
};

const MainLayout = (mainLayoutProps: MainLayoutProps) => {
    return (
    <div className="main-layout">
        <Map/>
        <div>
            <Character {...mainLayoutProps.characterProps}/>
            <Inventory {...mainLayoutProps.characterProps.inventory}/>
            <Location {...mainLayoutProps.locationProps}/>
        </div>
    </div>
    )
}

const mapStateToProps = ({ inventoryItems }: RootState) => ({
    inventoryProps: inventoryItems,
  });

export default connect(mapStateToProps)(MainLayout);
