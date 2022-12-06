import { gameState, phraseList, modalNames } from "./constants.js";
import { TGameSetup } from "./types.js";

const promptReload = (name:string) =>  alert(`${name} is missing. Please reload page.`);
const verifyExistence = (el:HTMLElement, name:string) => {
  if (el) return true;
  promptReload(name);
  return false;
}
const setUpWord = () => {
  const word:string = gameState.words[gameState.phraseIdx];
  const letterSpanArr:HTMLElement[] = [];

    for (let i = 0; i < word.length; i++){
      const newLetter = document.createElement("span");
      newLetter.innerText = word[i];
      letterSpanArr.push(newLetter);
    }

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
  if (gameEl == null){
    promptReload("gameEl");
    return;
  }
  // if gameEl is null add it to the body of the game first?
  gameEl.innerHTML = "";
  gameEl.classList.add("off");

  const instructionsButton = document.getElementById("instructions-button");
  instructionsButton!.classList.remove("off");
  const gameStartButton = document.getElementById("game-start-button");
  gameStartButton!.classList.remove("off");
};

const setupModalListeners = () => {
  
  const modalBackground = document.getElementById("modal-background");
  //add modal click divert
  document.body.addEventListener("click", (e) => {
    if (!modalBackground?.classList.contains("off")){
      e.preventDefault();
      modalBackground?.classList.add("off");
      for (const name in modalNames){
        const button = document.getElementById(`${name}-button`);
        button?.classList.add("off");
      }
    }
  })

  const setupButton = (name:string) => {
    const button = document.getElementById(`${name}-button`);
    const modal = document.getElementById(`${name}-modal`);

    button!.addEventListener("click", () => {
      modalBackground!.classList.remove("off");
      modal!.classList.remove("off");
    });
  }

  for (const modalName in modalNames){
    setupButton(modalName);
  }
};

window.addEventListener("DOMContentLoaded", () => {

  const modalBackground = document.getElementById("modal-background");
  modalBackground!.addEventListener("click", () => {
    modalBackground!.classList.toggle("off");
  });

  setupModalListeners();

  const loadTextButton = document.getElementById("load-text");
  loadTextButton!.addEventListener("click", () => {
    gameSetup(phraseList);
    setUpWord();
    gameState.prevTimestamp = Date.now();
  });
});





