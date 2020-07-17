import React from 'react';
import {ItemProps} from "../inventory/Item";
import  { Position } from "../../store/rootState";

export interface ChestProps {
    item: ItemProps;
    question: Question;
    position: Position
}

export interface Question {
    content: String;
    answer: String;
}

