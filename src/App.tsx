import React from "react";
import MainLayout from "./components/layout/MainLayout";
import Control from "./components/control/Control";
import './App.css';
import {ItemBonusType} from "./model/itemBonusType";

function App() {
    return (
        <div className="App">
            <MainLayout inventoryProps={{
                itemProps: [
                    {name: "itemik", color: "red", image: "", bonusType: ItemBonusType.DAMAGE, value: 10},
                    {name: "mieczyk", color: "yellow", image: "", bonusType: ItemBonusType.DEFENSE, value: 20}]
            }}
                        characterProps={{name: "Character"}}
                        locationProps={{name: "Location"}}/>
            <Control/>
        </div>
    )
};

export default App;
