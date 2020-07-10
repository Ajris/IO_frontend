import React from 'react';

export interface CharacterProps {
    name: string;
    lifes: number;
    exp: number;
}
const CharacterView = (characterProps: CharacterProps) => {
    return (
        <div className="character">
            <CharacterView {...characterProps}/>
        </div>
    )
}

export default CharacterView;
