

const keyDownListener = (referenceEl, sampleText) => {
  // SRP -- 
  // check what key is pressed -- if it is current char -- green
  //                              if it is a char


};

window.addEventListener("DOMContentLoaded", () => {
  const typedEl = document.getElementById("typed");
  const currentEl = document.getElementById("current");
  const toTypeEl = document.getElementById("to-type");
  const inputEl = document.getElementById("input");
  
  const sampleText = "The quick brown fox jumped over the lazy dog.";

  currentEl.innerText = sampleText[0];
  toTypeEl.innerText = sampleText.slice(1);

  

  const handleInput = (key) => {
    const newSpan = document.createElement("span");
    newSpan.innerText = key;
    newSpan.classList.add( key === currentEl.innerText ? "correct" : "error");
    typedEl.appendChild(newSpan);
    currentEl.innerText = toTypeEl.innerText[0];
    console.log(toTypeEl.innerText);
    toTypeEl.innerText = toTypeEl.innerText.slice(1);
    console.log(toTypeEl.innerText);
  }

  inputEl.addEventListener("keydown", event => {
    event.preventDefault();
    if(event.key.length === 1) handleInput(event.key);
  })

});


// next to do -- array of string + correct or wrong
// add eventListener for keyDown on inputEl
// add eventListener for keyUp on inputEl
// be able to control text of inputEl
// through the keyDown inputs




