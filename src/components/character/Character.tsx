import React from 'react';

export interface CharacterProps {
    name: String;
};

const Character = ({name}: CharacterProps) => {
    return (
        <div className="character">
            {name}
        </div>
    )
}

export default Character;
