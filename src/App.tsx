import React from "react";
import { connect } from "react-redux";
import MainLayout from "./components/layout/MainLayout";
import Control from "./components/control/Control";
import './App.css';
import {ItemBonusType} from "./model/itemBonusType";
import RootState from "./store/rootState";

function App() {
    let inventoryProps = {
        itemProps: [
            {name: "itemik", color: "red", image: "", bonusType: ItemBonusType.DAMAGE, value: 10},
            {name: "mieczyk", color: "yellow", image: "", bonusType: ItemBonusType.DEFENSE, value: 20}]
    }
    return (
        <div className="App">
            <MainLayout
                // characterProps={{name: "jacek", lifes: 1, exp: 2, inventory: inventoryProps}}
                //         locationProps={{name: "Location"}}
            />
            <Control/>
        </div>
    )
};

export default App;
