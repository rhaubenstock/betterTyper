// phrases from Project Gutenberg's Fifteen Thousand Useful Phrases, by Greenville Kleiser
// https://www.gutenberg.org/files/18362/18362.txt
export const phraseList = [
    "ced"
    // "A bewildering labyrinth of facts",
    // "A blank absence of interest or sympathy",
    // "A bloodless diplomatist",
    // "A breach of confidence",
    // "A brilliant and paradoxical talker",
];
export const gameState = {
    active: false,
    combo: 0,
    textElement: null,
    phraseIdx: 0,
    charIdx: 0,
    ltrSpanArr: [],
    words: [],
    key: '',
    prevChar: '',
    prevTimestamp: 0,
    correctTimeDiffs: [],
    incorrectTimeDiffs: [],
    dashboardEls: {},
    dashValues: {},
    keyboard: {}
};
export const modalNames = [
    "guide",
    "story",
    "resources",
    "settings",
];
export const dashNames = [
    "time-dash",
    "wpm-dash",
    "combo-dash",
    "progress-dash",
    "correct-chars-dash",
    "incorrect-chars-dash",
];
