interface TileEntry {
    icon: string;
};

class EmptyEntry implements TileEntry {
    icon = '';
}

class PlayerEntry implements TileEntry {
    icon = 'x';
}

export {EmptyEntry, PlayerEntry};
export default TileEntry;
