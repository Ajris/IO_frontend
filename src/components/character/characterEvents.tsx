import {CharacterProps} from "./Character";

const decrementLifes = (character: CharacterProps) => {
    character.lifes--;
}

const incrementLifes = (character: CharacterProps) => {
    character.lifes++;
}

const addExp = (character: CharacterProps, value: number) => {
    character.exp += value;
}

const getLevel = (character: CharacterProps, value: number) => {
    // TODO div by some const
    return character.exp;
}

const getFightFactor = (character: CharacterProps) => {
    return character.exp + (character.inventory.length * 3);
}

