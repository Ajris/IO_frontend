import React from 'react';
import ItemView from "./Item";
import {Items} from "../../store/reducers";


const Inventory = (items: Items) => {
        return (
            <div className="inventory">
                Inventory
                {items.inventoryItems.map(item => (
                    <ItemView {...item}/>
                ))}
            </div>
        )
};
export default Inventory;
