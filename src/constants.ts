import { TGameState } from "./types";

export const wordList:string[] = ["pizzas",
    "suburban",
    "assuming",
    "obstinance",
    "foramens",
];

export const gameState:TGameState = {
    wordIdx: 0,
    letterIdx: 0,
    ltrSpanArr: [],
    words: [],
    key: '',
    prevChar: '',
    prevTimestamp: 0,
    correctTimeDiffs: [],
    incorrectTimeDiffs: []
};


