/**  
 * gameSetup is a function
 * @param word string: word you want user to type out that appears on screen
 * @example
 * gameSetup("hello", [])
*/
export type TGameSetup = (words: string[]) => void;

export type TGameState = {
    wordIdx: number;
    letterIdx: number;
    ltrSpanArr: HTMLElement[];
    words: string[];
    key: string;
    prevChar: string;
    prevTimestamp: number;
};