const wordList = ["pizzas",
                  "suburban",
                  "assuming",
                  "obstinance",
                  "foramens",
                 ];

// const handleInput = (key) => {
//   const newSpan = document.createElement("span");
//   newSpan.innerText = key;
//   newSpan.classList.add(key === currentEl.innerText ? "correct" : "error");
//   typedEl.appendChild(newSpan);
//   currentEl.innerText = toTypeEl.innerText[0];
//   console.log(toTypeEl.innerText);
//   toTypeEl.innerText = toTypeEl.innerText.slice(1);
//   console.log(toTypeEl.innerText);
// };

const gameStart = (word, ltrSpanArr) => {
//   // <p>
//   //   <span id="typed"></span>
//   //   <span id="current" class="current"></span>
//   //   <span id="to-type"></span>
//   // </p>
//   // <input type="text" id="input"></input>

//   // const typedSpan = document.createElement("span");
//   // typedSpan.classList.add("typed");

//   // const currSpan = document.createElement("current");
//   // currSpan.classList.add("typed");

//   const toTypeSpan = document.createElement("to-type");
//   toTypeSpan.classList.add("to-type");
//   // generate word -- break into letters -- each contained in a span
//   // array of spans
//   // 

//   inputEl.addEventListener("keydown", event => {
//     event.preventDefault();
//     if (event.key.length === 1) handleInput(event.key);
//   })
  idx = 0;
  const handleInput = (key) => {
    ltrSpanArr[idx].classList.remove("current");
    if (word[idx] === key){
      ltrSpanArr[idx].classList.remove("error");
      ltrSpanArr[idx].classList.add("correct");
      idx += 1;
      if (idx === word.length){
        // maybe add a set timeout first?
        gameStop();
      }
      else {
        ltrSpanArr[idx].classList.add("current");
      }
    }
    else{
      ltrSpanArr[idx].classList.add("error");
    }
  };
  document.body.addEventListener("keydown", event => {
    event.preventDefault();
    if (event.key.length === 1) handleInput(event.key);

  });
};

const gameStop = () => {
  document.body.removeEventListener("keydown");
  document.body.removeEventListener("keyup");
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




