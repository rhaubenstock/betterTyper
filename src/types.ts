/**  
 * gameStart is a function
 * @param word string: word you want user to type out that appears on screen
 * @example
 * gameStart("hello", [])
*/
export type TGameStart = (word: string, ltrSpanArr: HTMLElement[]) => void;

export type TGameState = {
    wordIdx: number;
    letterIdx: number;
    ltrSpanArr: HTMLElement[];
    words: string[];
    key: string;
    prevChar: string;
    prevTimestamp: number;
};