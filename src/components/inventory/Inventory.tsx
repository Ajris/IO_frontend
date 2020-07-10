import React from 'react';
import ItemView, {ItemProps} from "./Item";

export interface InventoryProps {
    itemProps: ItemProps[];
};

const Inventory = ({itemProps}: InventoryProps) => {
    return (
        <div className="inventory">
            Inventory
            {itemProps.map(item => <ItemView {...item}/>)}
        </div>
    )
};

export default Inventory;
