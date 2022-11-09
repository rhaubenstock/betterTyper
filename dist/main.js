import { gameState, phraseList } from "./constants.js";
// const listeners = {
//   keydownListener: undefined
// };
const setUpWord = () => {
    const word = gameState.words[gameState.phraseIdx];
    const letterSpanArr = [];
    word.split("").forEach(letter => {
        const newLetter = document.createElement("span");
        newLetter.innerText = letter;
        letterSpanArr.push(newLetter);
    });
    const gameEl = document.getElementsByClassName("game")[0];
    letterSpanArr[0].classList.add("current");
    gameState.ltrSpanArr = letterSpanArr;
    gameEl.replaceChildren(...letterSpanArr);
};
const getNextState = () => {
    gameState.phraseIdx += 1;
    gameState.charIdx = 0;
    if (gameState.phraseIdx === gameState.words.length) {
        gameStop();
        return;
    }
    setUpWord();
};
const processKeys = (timeDiff) => {
    if (!gameState)
        return;
    const { ltrSpanArr, words } = gameState;
    const word = words[gameState.phraseIdx];
    const key = gameState.key;
    ltrSpanArr[gameState.charIdx].classList.remove("current");
    if (word[gameState.charIdx] !== key) {
        ltrSpanArr[gameState.charIdx].classList.add("error");
        gameState.incorrectTimeDiffs.push(timeDiff);
        return;
    }
    gameState.correctTimeDiffs.push(timeDiff);
    ltrSpanArr[gameState.charIdx].classList.remove("error");
    ltrSpanArr[gameState.charIdx].classList.add("correct");
    gameState.charIdx += 1;
    if (gameState.charIdx === word.length) {
        getNextState();
    }
    else {
        ltrSpanArr[gameState.charIdx].classList.add("current");
    }
};
const handleKeydown = (event) => {
    var _a;
    event.preventDefault();
    // event key is either going to be empty array or array of all keyst pressing
    // string and array methods -> lot of overlap
    // match -> return array of matches and idxs of the matches elements
    // regEx -> test, match, execute -- resource: regex101.com
    // 
    //
    if ((_a = event === null || event === void 0 ? void 0 : event.key) === null || _a === void 0 ? void 0 : _a.match(/[a-zA-Z ]/)) {
        gameState.key = event.key;
        const time = Date.now();
        const timeDiff = time - gameState.prevTimestamp;
        gameState.prevTimestamp = time;
        processKeys(timeDiff);
    }
};
// implement later
const handleKeyup = (event) => {
    event.preventDefault();
};
// can add @return, @extends, @deprecated
const gameSetup = (words) => {
    // generate sequence of words
    // setup gameState variables
    gameState.charIdx = 0;
    gameState.phraseIdx = 0;
    gameState.words = words;
    document.body.addEventListener("keydown", handleKeydown);
    document.body.addEventListener("keyup", handleKeyup);
};
const gameStop = () => {
    document.body.removeEventListener("keydown", handleKeydown);
    document.body.removeEventListener("keyup", handleKeyup);
    // console.log(gameState.correctTimeDiffs);
    // console.log(gameState.incorrectTimeDiffs);
    const gameEl = document.getElementsByClassName("game")[0];
    gameEl.innerHTML = "";
    gameEl.classList.add("off");
    const instructionsButton = document.getElementsByClassName("instructions-button")[0];
    instructionsButton.classList.remove("off");
    const gameStartButton = document.getElementsByClassName("game-start-button")[0];
    gameStartButton.classList.remove("off");
};
window.addEventListener("DOMContentLoaded", () => {
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
        // turn off first screen
        instructionsButton.classList.toggle("off");
        gameStartButton.classList.toggle("off");
        gameEl.classList.toggle("off");
        gameSetup(phraseList);
        setUpWord();
        gameState.prevTimestamp = Date.now();
    });
});
