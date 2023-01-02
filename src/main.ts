import { gameState, phraseList, modalNames, dashNames } from "./constants.js";
import { TGameSetup } from "./types.js";
import Keyboard from "./keyboard/keyboard.js";


const updateDash = () => {
  for(const name in dashNames){
    if(gameState.dashboardEls[name]){
      // @ts-ignore comment.
      gameState.dashboardEls[name].innerHTML = gameState.dashValues[name];
    }
  }
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
    gameState.textElement?.replaceChildren(...letterSpanArr);
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

const gameStart = () => {
  if (!gameState.active){
    gameState.prevTimestamp = Date.now();
    gameState.active = true;
  }
};

const processKey = (timeDiff:number) => {
  const { ltrSpanArr, words, active } = gameState;
  if (!active) gameStart();
  const word = words[gameState.phraseIdx];
  const key = gameState.key;
  ltrSpanArr[gameState.charIdx].classList.remove("current");

  if (word[gameState.charIdx] !== key) {
    ltrSpanArr[gameState.charIdx].classList.add("error");
    gameState.incorrectTimeDiffs.push(timeDiff);
    gameState.combo = 0;
    const incorrectChars = document.getElementById("incorrect-chars-count");
    // @ts-ignore comment.
    incorrectChars.innerHTML = `${gameState.incorrectTimeDiffs.length}`;
    return;
  }
  gameState.correctTimeDiffs.push(timeDiff);
  gameState.combo += 1;
  ltrSpanArr[gameState.charIdx].classList.remove("error");
  ltrSpanArr[gameState.charIdx].classList.add("correct");

  const correctChars = document.getElementById("correct-chars-count");
  // @ts-ignore comment.
  correctChars.innerHTML = `${gameState.correctTimeDiffs.length}`;
  gameState.charIdx += 1;
  if (gameState.charIdx === word.length) {
    getNextState();
  }
  else {
    ltrSpanArr[gameState.charIdx].classList.add("current");
  }
};

const keyToId = (key: string) => {
  if (key !== " ") return `key--${key.toLowerCase()}`;
  return "key--space";
}

const handleKeydown = (event:KeyboardEvent) => {
  event.preventDefault();
  // event key is either going to be empty array or array of all keyst pressing
  // string and array methods -> lot of overlap
  // match -> return array of matches and idxs of the matches elements
  // regEx -> test, match, execute -- resource: regex101.com
  // 
  //
  
  if (event.key.length === 1 && event?.key?.match(/[a-zA-Z ]/)) {
    gameState.key = event.key;
    const keyEl = document.getElementById(keyToId(event.key));
    // @ts-ignore comment.
    keyEl?.classList.add("pressed");
    const time = Date.now();
    const timeDiff = time - gameState.prevTimestamp;
    gameState.prevTimestamp = time;
    processKey(timeDiff);
  }
};

const handleKeyup = (event:KeyboardEvent) => {
  event.preventDefault();
  if (event.key.length === 1 && event?.key?.match(/[a-zA-Z ]/)) {
    gameState.key = event.key;
    const keyEl = document.getElementById(keyToId(event.key));
    // @ts-ignore comment.
    keyEl?.classList.remove("pressed");
  }
}

const gameSetup:TGameSetup = (words:string[]) => {
  // generate sequence of words
  // setup gameState variables
  gameState.charIdx = 0;
  gameState.phraseIdx = 0;
  gameState.words = words;
  
  document.getElementById("")
  document.body.addEventListener("keydown", handleKeydown);
  document.body.addEventListener("keyup", handleKeyup);
};


const gameStop = () => {
  gameState.active = false;
  document.body.removeEventListener("keydown", handleKeydown);
  document.body.removeEventListener("keyup", handleKeyup);

  // @ts-ignore comment.
  gameState.keyboard.elements.keysContainer.classList.add("off");
    
  const textElement = gameState.textElement;
  // @ts-ignore comment.
  textElement?.innerHTML = "";
  // @ts-ignore comment.
  textElement?.classList.add("off");

  const keyElements = document.getElementsByClassName("keyboard__key");
  for (const key of keyElements){
    // @ts-ignore comment.
    key.classList.remove("pressed");
  }
  
  const gameStartButton = document.getElementById("load-text");
  gameStartButton?.classList.remove("off");
};

const setupModalListeners = () => {
  
  const modalBackground = document.getElementById("modal-background");

  const setupButton = (name:string) => {
    const button = document.getElementById(`${name}-button`);
    const modal = document.getElementById(`${name}-modal`);
    button?.addEventListener("click", () => {
      modalBackground?.classList.toggle("off");
      modal?.classList.toggle("off");
    });
  };

  for (const name of modalNames){
    setupButton(name);
  }
};


const setUpElements = () => {
  gameState.textElement = document.getElementById("text-element");

  for (const name of dashNames){
    gameState.dashboardEls[name] = document.getElementById(name);
  }
}

window.addEventListener("DOMContentLoaded", () => {

  setupModalListeners();
  setUpElements();
  gameState.keyboard = Keyboard;
  // @ts-ignore comment.
  gameState.keyboard.init();
  const loadTextButton = document.getElementById("load-text");
  loadTextButton?.addEventListener("click", () => {
    const textbox = document.getElementById('text-element');
    textbox?.classList.remove('off');
    loadTextButton?.classList.add('off');
     // @ts-ignore comment.
    gameState.keyboard.elements.keysContainer.classList.remove("off");
    gameSetup(phraseList);
    setUpWord();
  });
});





