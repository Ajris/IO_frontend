import React from 'react';

export interface LocationProps {
    name: String;
};

const Location = ({name}: LocationProps) => {
    return (
        <div className="location">
            {name}
        </div>
    )
}

export default Location;
