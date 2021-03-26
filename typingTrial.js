const wordList = ["pizzas",
                  "suburban",
                  "assuming",
                  "obstinance",
                  "foramens",
                 ];

const gameState = {
  wordIdx: undefined,
  letterIdx: undefined,
  ltrSpanArr: undefined,
  words: undefined,
  processingKeyQueue: undefined,
  processingKeys: undefined
};

const listeners = {
  keydownListener: undefined
};

const processKeys = () => {
  const { ltrSpanArr, processingKeyQueue } = gameState;
  const word = gameState.words[gameState.wordIdx];
  while (processingKeyQueue.length > 0){
    let key = processingKeyQueue.shift();
    ltrSpanArr[gameState.letterIdx].classList.remove("current");
    if (word[gameState.letterIdx] === key){
      ltrSpanArr[gameState.letterIdx].classList.remove("error");
      ltrSpanArr[gameState.letterIdx].classList.add("correct");
      gameState.letterIdx += 1;
      if (gameState.letterIdx === word.length){
        // maybe add a set timeout first?
        console.log("game over")
        gameStop();
      }
      else {
        ltrSpanArr[gameState.letterIdx].classList.add("current");
      }
    }
    else{
      ltrSpanArr[gameState.letterIdx].classList.add("error");
    }
  }
  gameState.processingKeys = false;
};


const handleKeydown = event => {
  event.preventDefault();
  // problem with mashing keys -- 
  // probably need like a processing variable
  if (event.key.length === 1) {
    gameState.processingKeyQueue.push(event.key);
    if(!gameState.processingKeys) processKeys();
  }
};


const gameStart = (word, ltrSpanArr) => {
  gameState.letterIdx = 0;
  gameState.wordIdx = 0;
  gameState.words = [word];
  gameState.ltrSpanArr = ltrSpanArr;
  gameState.processingKeyQueue = [];
  gameState.processingKeys = false;
  document.body.addEventListener("keydown", handleKeydown);
};

const gameStop = () => {
  document.body.removeEventListener("keydown", handleKeydown);
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
    // game Start function here
    // -- add a word
    //make instructions Button disappear?
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




