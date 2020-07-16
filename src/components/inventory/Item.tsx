import React from 'react';
import {ItemBonusType} from "../../model/itemBonusType";

export interface ItemProps {
    name: string;
    color: string;
    position?: number[];
    bonusType?: ItemBonusType;
    value?: number;
}

const ItemView = (itemProps: ItemProps) => {
    return (
        <div className="item" style={{backgroundColor: itemProps.color}}>
            {itemProps.name}
        </div>
    )
    
};

export default ItemView; 
