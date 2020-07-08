import React from 'react';

export interface InventoryProps {
    name: String;
};

const Inventory = ({name}: InventoryProps) => {
    return (
        <div className="inventory">
            {name}
        </div>
    )
}

export default Inventory;
