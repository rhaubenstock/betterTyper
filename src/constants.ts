import { TGameState } from "./types";

// phrases from Project Gutenberg's Fifteen Thousand Useful Phrases, by Greenville Kleiser
// https://www.gutenberg.org/files/18362/18362.txt

export const phraseList:string[] = [
    "A bewildering labyrinth of facts",
    "A blank absence of interest or sympathy",
    "A bloodless diplomatist",
    "A breach of confidence",
    "A brilliant and paradoxical talker",
];

export const gameState:TGameState = {
    gameEl: document.getElementById("game"),
    phraseIdx: 0,
    charIdx: 0,
    ltrSpanArr: [],
    words: [],
    key: '',
    prevChar: '',
    prevTimestamp: 0,
    correctTimeDiffs: [],
    incorrectTimeDiffs: []
};

export const modalNames:String[] = [
    "guide",
    "story",
    "resources"
];

