import React from 'react';
import {ItemBonusType} from "../../model/itemBonusType";

export interface ItemProps {
    name: string;
    position?: number[];
    image: string;
    bonusType?: ItemBonusType;
    value?: number;
}

const ItemView = (itemProps: ItemProps) => {
    return (
        <div className="item" style={{backgroundImage: `url(${itemProps.image})`}}>
            {itemProps.name}
        </div>
    )
    
};

export default ItemView; 
