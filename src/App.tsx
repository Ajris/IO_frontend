import React from "react";
import MainLayout from "./components/layout/MainLayout";
import Control from "./components/control/Control";
import './App.css';
import {ItemBonusType} from "./model/itemBonusType";

function App() {
    return (
        <div className="App">
            <MainLayout characterProps={{name: "jacek", lifes: 1, exp: 2, inventory: []}}
                        locationProps={{name: "Location"}}/>
            <Control/>
        </div>
    )
};

export default App;
