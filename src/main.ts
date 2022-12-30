import { gameState, phraseList, modalNames, dashNames } from "./constants.js";
import { TGameSetup } from "./types.js";
import Keyboard from "./keyboard/keyboard.js";

const promptReload = (name:string) => {
  alert(`It appears you have deleted the ${name} HTML Element!
  It seems that as a developer my choice is to either try to reinsert
  the element, reload the page, or let you the user know what has happened and
  let you decide how best to proceed.
  If you have any recommendations for best practices regarding what to do in 
  this situation please let me know through GitHub!`);
};
const verifyExistence = (el:HTMLElement|null, name:string) => {
  if (el) return true;
  promptReload(name);
  return false;
}

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
    verifyExistence(incorrectChars, "incorrectChars");
    // @ts-ignore comment.
    incorrectChars.innerHTML = `${gameState.incorrectTimeDiffs.length}`;
    return;
  }
  gameState.correctTimeDiffs.push(timeDiff);
  gameState.combo += 1;
  ltrSpanArr[gameState.charIdx].classList.remove("error");
  ltrSpanArr[gameState.charIdx].classList.add("correct");

  const correctChars = document.getElementById("correct-chars-count");
  verifyExistence(correctChars, "correctChars");
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
  if (event?.key?.match(/[a-zA-Z ]/)) {
    gameState.key = event.key;
    const keyEl = document.getElementById(keyToId(event.key));
    // @ts-ignore comment.
    keyEl.classList.add("pressed");
    const time = Date.now();
    const timeDiff = time - gameState.prevTimestamp;
    gameState.prevTimestamp = time;
    processKey(timeDiff);
  }
};

const handleKeyup = (event:KeyboardEvent) => {
  event.preventDefault();
  if (event?.key?.match(/[a-zA-Z ]/)) {
    gameState.key = event.key;
    const keyEl = document.getElementById(keyToId(event.key));
    // @ts-ignore comment.
    keyEl.classList.remove("pressed");
  }
}

const gameSetup:TGameSetup = (words:string[]) => {
  // generate sequence of words
  // setup gameState variables
  gameState.charIdx = 0;
  gameState.phraseIdx = 0;
  gameState.words = words;
  
  document.body.addEventListener("keydown", handleKeydown);
  document.body.addEventListener("keyup", handleKeyup);
};


const gameStop = () => {
  gameState.active = false;
  document.body.removeEventListener("keydown", handleKeydown);
  document.body.removeEventListener("keyup", handleKeyup);
  // @ts-ignore comment.
  gameState.keyboard.elements.keysContainer.classList.remove("off");
    
  const textElement = gameState.textElement;
  //verifyExistence already takes care of verifying textElement is not null
  //and creates window alert if it is null
  if(!verifyExistence(textElement, "textElement")) return;
  // @ts-ignore comment.
  textElement.innerHTML = "";
  // @ts-ignore comment.
  textElement.classList.add("off");

  const instructionsButton = document.getElementById("instructions-button");
  instructionsButton!.classList.remove("off");
  const gameStartButton = document.getElementById("game-start-button");
  gameStartButton!.classList.remove("off");
};

const setupModalListeners = () => {
  
  const modalBackground = document.getElementById("modal-background");
  //add modal click divert
  // not working -> ask for help to figure out how to 
  // disable clicks + hovers when modal is up
  // and make next click close the modal wherever it is

  // document.body.addEventListener("click", (e) => {
  //   //body listener triggers second -> on off 
  //   if (!modalBackground?.classList.contains("off")){
  //     e.preventDefault();
  //     modalBackground?.classList.add("off");
  //     for (const name of modalNames){
  //       const modal = document.getElementById(`${name}-modal`);
  //       modal?.classList.add("off");
  //     }
  //   }
  // })

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
  // @ts-ignore comment.
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





