import {gameState, wordList} from "./constants.js";
import { TGameStart } from "./types.js";
// import debug from "debug";
// let log;

//can access this through browser terminal
//want to hide it -> browser can only see global obj

//iife -> immediately invoked function expression
// (() => {

//})() 

// multiple ways to approach sharing gameState but also keeping hidden:
//  1. npm packages -> hidden in local storage
//  2. class -> ecmaScript 7 -> private methods, private properties -- use '#' 
//    a. Potential issue with browser compatibility
//    b. webpack
//    c. polyfill/shim -> fill in missing pieces
//    d. rollup -> set up config -> compile from ts to js -> remove comments, 
//       can obfuscate, minify/compress, 
//    e. Shims reproduce spread/rest operator
//  3. 



// const listeners = {
//   keydownListener: undefined
// };

const processKeys = () => {
  if(!gameState) return;
  const { ltrSpanArr, words } = gameState;
  const word = words[gameState.wordIdx];
  const key = gameState.key;
  ltrSpanArr[gameState.letterIdx].classList.remove("current");
  if (word[gameState.letterIdx] === key) {
    ltrSpanArr[gameState.letterIdx].classList.remove("error");
    ltrSpanArr[gameState.letterIdx].classList.add("correct");
    gameState.letterIdx += 1;
    if (gameState.letterIdx === word.length) {
      // maybe add a set timeout first?
      // console.log("game over")
      gameStop();
    }
    else {
      ltrSpanArr[gameState.letterIdx].classList.add("current");
    }
  }
  else {
    ltrSpanArr[gameState.letterIdx].classList.add("error");
  }
};


const handleKeydown = (event:KeyboardEvent) => {
  event.preventDefault();
  // event key is either going to be empty array or array of all keyst pressing
  // string and array methods -> lot of overlap
  // match -> return array of matches and idxs of the matches elements
  // regEx -> test, match, execute -- resource: regex101.com
  // 
  if (event?.key?.match(/[a-zA-Z]/)) {
    gameState.key = event.key;
    // const time = Date.now();
    // const timeDiff = time - gameState.prevTimestamp;
    // gameState.prevTimestamp = time;
    processKeys();
  }
};

const handleKeyup = (event:KeyboardEvent) => {
  event.preventDefault();

}

// can add @return, @extends, @deprecated

const gameStart:TGameStart = (word:string, ltrSpanArr:HTMLElement[]) => {
  gameState.letterIdx = 0;
  gameState.wordIdx = 0;
  gameState.words = [word];
  gameState.ltrSpanArr = ltrSpanArr;
  document.body.addEventListener("keydown", handleKeydown);
  document.body.addEventListener("keyup", handleKeyup);
};

const gameStop = () => {
  document.body.removeEventListener("keydown", handleKeydown);
  document.body.removeEventListener("keyup", handleKeyup);
  const gameEl = document.getElementsByClassName("game")[0];
  gameEl.innerHTML = "";
  gameEl.classList.add("off");
  const instructionsButton = document.getElementsByClassName("instructions-button")[0];
  instructionsButton.classList.remove("off");
  const gameStartButton = document.getElementsByClassName("game-start-button")[0];
  gameStartButton.classList.remove("off");
}


window.addEventListener("DOMContentLoaded", () => {
  // log = window.debug("typer");
  // window.debug.enable("typer");
  // log("hello");
  // console.log(window);

  const modalBackground = document.getElementsByClassName("modal-background")[0];
  modalBackground.addEventListener("click", () => {
    modalBackground.classList.toggle("off");
  });

  const instructionsButton = document.getElementsByClassName("instructions-button")[0];
  instructionsButton.addEventListener("click", () => {
    modalBackground.classList.toggle("off");
  });

  const gameEl = document.getElementsByClassName("game")[0];

  const gameStartButton = document.getElementsByClassName("game-start-button")[0];

  gameStartButton.addEventListener("click", () => {
    instructionsButton.classList.toggle("off");
    gameStartButton.classList.toggle("off");
    const word = wordList[Math.trunc(Math.random() * wordList.length)];
    gameEl.classList.toggle("off");
    const letterSpanArr:HTMLElement[] = [];
    word.split("").forEach(letter => {
      const newLetter = document.createElement("span");
      newLetter.innerText = letter;
      letterSpanArr.push(newLetter);
    });
    letterSpanArr[0].classList.add("current");
    letterSpanArr.forEach(letterSpan => gameEl.appendChild(letterSpan));
    gameStart(word, letterSpanArr);
  });
});





