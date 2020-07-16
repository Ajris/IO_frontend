import React from 'react';

export interface CharacterProps {
        name: string;
        lifes: number;
        exp: number;
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
