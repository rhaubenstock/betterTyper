import {gameState, phraseList} from "./constants.js";
import { TGameSetup } from "./types.js";

const setUpWord = () => {
  const word:string = gameState.words[gameState.phraseIdx];
  const letterSpanArr:HTMLElement[] = [];

    for(let i = 0; i < word.length; i++){
      const letter = word[i];
      const newLetter = document.createElement("span");
      newLetter.innerText = letter;
      letterSpanArr.push(newLetter);
    };
    letterSpanArr[0].classList.add("current");
    gameState.ltrSpanArr = letterSpanArr;
    gameState.gameEl!.replaceChildren(...letterSpanArr);
};

const getNextState = () => {
  gameState.phraseIdx += 1;
  gameState.charIdx = 0;
  if (gameState.phraseIdx === gameState.words.length){
    gameStop();
    return;
  }
  setUpWord();
};

const processKey = (timeDiff:number) => {
  if(!gameState) return;

  const { ltrSpanArr, words } = gameState;
  const word = words[gameState.phraseIdx];
  const key = gameState.key;
  ltrSpanArr[gameState.charIdx].classList.remove("current");

  if (word[gameState.charIdx] !== key) {
    ltrSpanArr[gameState.charIdx].classList.add("error");
    gameState.incorrectTimeDiffs.push(timeDiff);

    const incorrectChars = document.getElementsByClassName("incorrect-chars")[0];
    incorrectChars.innerHTML = `${gameState.incorrectTimeDiffs.length}`;
    return;
  }
  gameState.correctTimeDiffs.push(timeDiff);
  ltrSpanArr[gameState.charIdx].classList.remove("error");
  ltrSpanArr[gameState.charIdx].classList.add("correct");

  const correctChars = document.getElementsByClassName("correct-chars")[0];
  correctChars.innerHTML = `${gameState.correctTimeDiffs.length}`;
  gameState.charIdx += 1;
  if (gameState.charIdx === word.length) {
    getNextState();
  }
  else {
    ltrSpanArr[gameState.charIdx].classList.add("current");
  }
};


const handleKeydown = (event:KeyboardEvent) => {
  event.preventDefault();
  // event key is either going to be empty array or array of all keyst pressing
  // string and array methods -> lot of overlap
  // match -> return array of matches and idxs of the matches elements
  // regEx -> test, match, execute -- resource: regex101.com
  // 
  //
  if (event?.key?.match(/[a-zA-Z ]/)) {
    gameState.key = event.key;
    const time = Date.now();
    const timeDiff = time - gameState.prevTimestamp;
    gameState.prevTimestamp = time;
    processKey(timeDiff);
  }
};



const gameSetup:TGameSetup = (words:string[]) => {
  // generate sequence of words
  // setup gameState variables
  gameState.charIdx = 0;
  gameState.phraseIdx = 0;
  gameState.words = words;
  document.body.addEventListener("keydown", handleKeydown);
};



const gameStop = () => {
  document.body.removeEventListener("keydown", handleKeydown);
  const gameEl = gameState.gameEl;
  if(gameEl == null){
    alert("An error has occurred. Please reload page.");
    return;
  }
  // if gameEl is null add it to the body of the game first?
  gameEl.innerHTML = "";
  gameEl.classList.add("off");

  const instructionsButton = document.getElementById("instructions-button");
  instructionsButton!.classList.remove("off");
  const gameStartButton = document.getElementById("game-start-button");
  gameStartButton!.classList.remove("off");
}


window.addEventListener("DOMContentLoaded", () => {

  const modalBackground = document.getElementById("modal-background");
  modalBackground!.addEventListener("click", () => {
    modalBackground!.classList.toggle("off");
  });

  const instructionsButton = document.getElementById("instructions-button");
  instructionsButton!.addEventListener("click", () => {
    modalBackground!.classList.toggle("off");
  });

  //probably update to querySelectorAll
  //see here:
  //https://stackoverflow.com/questions/2694640/find-an-element-in-dom-based-on-an-attribute-value
  const gameEl = document.getElementById("game");
  const gameStartButton = document.getElementById("game-start-button");
  const correctChars = document.getElementById("correct-chars");
  const incorrectChars = document.getElementById("incorrect-chars");

  gameStartButton!.addEventListener("click", () => {
    // turn off first screen

    instructionsButton!.classList.toggle("off");
    gameStartButton!.classList.toggle("off");
    gameEl!.classList.toggle("off");
    correctChars!.classList.toggle("off");
    incorrectChars!.classList.toggle("off");
    gameSetup(phraseList);
    setUpWord();
    gameState.prevTimestamp = Date.now();
  });
});





