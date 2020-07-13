import React from 'react';
import Map from '../map/Map'
import Inventory, {InventoryProps} from "../inventory/Inventory";
import Character from "../character/Character";
import {CharacterProps} from "../character/Character";
import Location, {LocationProps} from "../location/Location";
import {connect} from "react-redux";
import RootState from "../../store/rootState";

export interface MainLayoutProps {
    // characterProps: CharacterProps;
    // locationProps: LocationProps;
    inventoryProps: InventoryProps
};

const MainLayout = ({inventoryProps}: MainLayoutProps) => {
    return (
    <div className="main-layout">
        <Map />
        <div>
            {/*<Character {...mainLayoutProps.characterProps}/>*/}
            <Inventory {...inventoryProps}/>
            {/*<Location {...mainLayoutProps.locationProps}/>*/}
        </div>
    </div>
    )
}

const mapStateToProps = ({inventory}: RootState) => ({
    inventoryProps: inventory,
});

export default connect(mapStateToProps)(MainLayout);
