import React from "react";
import MainLayout from "./components/layout/MainLayout";
import Control from "./components/control/Control";
import './App.css';

function App() {
  return (
    <div className="App">
      <MainLayout inventoryProps={{name: "Inventory"}}
                  characterProps={{name: "Character"}}
                  locationProps={{name: "Location"}} />
      <Control />
    </div>
  )};

export default App;
