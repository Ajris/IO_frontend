import React from 'react';
import {ItemProps} from "../inventory/Item";
import {InventoryProps} from "../inventory/Inventory";

export interface CharacterProps {
        name: string;
        lifes: number;
        exp: number;
        inventory: InventoryProps;
}



const CharacterView = (characterProps: CharacterProps) => {
    return (
        <div className="character">
            <div>Name: {characterProps.name}</div>
            <div>Exp: {characterProps.exp}</div>
            <div>Lifes: {characterProps.lifes}</div>
        </div>
    )
}

export default CharacterView;
