const wordList = ["pizzas",
                  "suburban",
                  "assuming",
                  "obstinance",
                  "foramens",
                 ];
// add num correct chars
// add num missed chars
// add num 
const gameState = {
  wordIdx: undefined,
  letterIdx: undefined,
  ltrSpanArr: undefined,
  words: undefined,
  key: undefined,
  prevChar: undefined,
  prevTimestamp: undefined
};

// const listeners = {
//   keydownListener: undefined
// };

const processKeys = () => {
  const { ltrSpanArr } = gameState;
  const word = gameState.words[gameState.wordIdx];
  const key = gameState.key;
  ltrSpanArr[gameState.letterIdx].classList.remove("current");
  if (word[gameState.letterIdx] === key){
    ltrSpanArr[gameState.letterIdx].classList.remove("error");
    ltrSpanArr[gameState.letterIdx].classList.add("correct");
    gameState.letterIdx += 1;
    if (gameState.letterIdx === word.length){
      // maybe add a set timeout first?
      // console.log("game over")
      gameStop();
    }
    else {
      ltrSpanArr[gameState.letterIdx].classList.add("current");
    }
  }
  else{
    ltrSpanArr[gameState.letterIdx].classList.add("error");
  }
};


const handleKeydown = event => {
  event.preventDefault();
  // problem with mashing keys -- 
  // probably need like a processing variable
  if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
    gameState.key = event.key;
    // const time = Date.now();
    // const timeDiff = time - gameState.prevTimestamp;
    // gameState.prevTimestamp = time;
    processKeys();
  }
};

const handleKeyup = event => {
  event.preventDefault();

}


const gameStart = (word, ltrSpanArr) => {
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
  const modalBackground = document.getElementsByClassName("modal-background")[0];
  modalBackground.addEventListener("click", ()=>{
    modalBackground.classList.toggle("off");
  });
  
  const instructionsButton = document.getElementsByClassName("instructions-button")[0];
  instructionsButton.addEventListener("click",()=>{
    modalBackground.classList.toggle("off");
  });

  const gameEl = document.getElementsByClassName("game")[0];

  const gameStartButton = document.getElementsByClassName("game-start-button")[0];
  
  gameStartButton.addEventListener("click", ()=> {
    instructionsButton.classList.toggle("off");
    gameStartButton.classList.toggle("off");
    const word = wordList[Math.trunc(Math.random() * wordList.length)];
    gameEl.classList.toggle("off");
    const letterSpanArr = [];
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


// next to do -- array of string + correct or wrong
// add eventListener for keyDown on inputEl
// add eventListener for keyUp on inputEl
// be able to control text of inputEl
// through the keyDown inputs




