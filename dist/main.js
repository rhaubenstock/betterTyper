import { gameState, phraseList, modalNames } from "./constants.js";
const promptReload = (name) => alert(`${name} is missing. Please reload page.`);
const verifyExistence = (el, name) => {
    if (el)
        return true;
    promptReload(name);
    return false;
};
const setUpWord = () => {
    var _a;
    const word = gameState.words[gameState.phraseIdx];
    const letterSpanArr = [];
    for (let i = 0; i < word.length; i++) {
        const newLetter = document.createElement("span");
        newLetter.innerText = word[i];
        letterSpanArr.push(newLetter);
    }
    letterSpanArr[0].classList.add("current");
    gameState.ltrSpanArr = letterSpanArr;
    (_a = gameState.textElement) === null || _a === void 0 ? void 0 : _a.replaceChildren(...letterSpanArr);
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
const processKey = (timeDiff) => {
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
        processKey(timeDiff);
    }
};
const gameSetup = (words) => {
    // generate sequence of words
    // setup gameState variables
    gameState.charIdx = 0;
    gameState.phraseIdx = 0;
    gameState.words = words;
    document.body.addEventListener("keydown", handleKeydown);
};
const gameStop = () => {
    document.body.removeEventListener("keydown", handleKeydown);
    const textElement = gameState.textElement;
    //verifyExistence already takes care of verifying textElement is not null
    //and creates window alert if it is null
    if (!verifyExistence(textElement, "textElement"))
        return;
    // @ts-ignore comment.
    textElement.innerHTML = "";
    // @ts-ignore comment.
    textElement.classList.add("off");
    const instructionsButton = document.getElementById("instructions-button");
    instructionsButton.classList.remove("off");
    const gameStartButton = document.getElementById("game-start-button");
    gameStartButton.classList.remove("off");
};
const setupModalListeners = () => {
    const modalBackground = document.getElementById("modal-background");
    //add modal click divert
    document.body.addEventListener("click", (e) => {
        //body listener triggers second -> on off 
        console.log("in body listener");
        if (modalBackground === null || modalBackground === void 0 ? void 0 : modalBackground.classList.contains("open")) {
            e.preventDefault();
            modalBackground === null || modalBackground === void 0 ? void 0 : modalBackground.classList.add("off");
            for (const name of modalNames) {
                const modal = document.getElementById(`${name}-modal`);
                modal === null || modal === void 0 ? void 0 : modal.classList.add("off");
            }
        }
    });
    const setupButton = (name) => {
        const button = document.getElementById(`${name}-button`);
        const modal = document.getElementById(`${name}-modal`);
        button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
            modalBackground === null || modalBackground === void 0 ? void 0 : modalBackground.classList.remove("off");
            modal === null || modal === void 0 ? void 0 : modal.classList.remove("off");
            setTimeout(() => modalBackground === null || modalBackground === void 0 ? void 0 : modalBackground.classList.add("open"), 10);
        });
    };
    for (const name of modalNames) {
        setupButton(name);
    }
};
window.addEventListener("DOMContentLoaded", () => {
    const modalBackground = document.getElementById("modal-background");
    setupModalListeners();
    gameState.textElement = document.getElementById("text-element");
    const loadTextButton = document.getElementById("load-text");
    loadTextButton === null || loadTextButton === void 0 ? void 0 : loadTextButton.addEventListener("click", () => {
        const textbox = document.getElementById('text-element');
        textbox === null || textbox === void 0 ? void 0 : textbox.classList.remove('off');
        gameSetup(phraseList);
        setUpWord();
        gameState.prevTimestamp = Date.now();
        loadTextButton === null || loadTextButton === void 0 ? void 0 : loadTextButton.classList.add('off');
    });
});
