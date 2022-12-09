/**  
 * gameSetup is a function
 * @param word string: word you want user to type out that appears on screen
 * @example
 * gameSetup("hello", [])
*/
export type TGameSetup = (words: string[]) => void;

export type TGameState = {
    active: Boolean;
    combo: number;
    textElement: HTMLElement | null;
    phraseIdx: number;
    charIdx: number;
    ltrSpanArr: HTMLElement[];
    words: string[];
    key: string;
    prevChar: string;
    prevTimestamp: number;
    correctTimeDiffs: number[];
    incorrectTimeDiffs: number[];
    dashValues: {[key:string]: number}
    dashboardEls: {[key:string]: HTMLElement|null};
};