



window.addEventListener("DOMContentLoaded", () => {
  const referenceEl = document.getElementById("reference");
  const inputEl = document.getElementById("input");
  
  const sampleText = "The quick brown fox jumped over the lazy dog.";

  const doneText = "";
  const currChar = sampleText[0];
  const nextText = sampleText.slice(1);


  const doneSpan = document.createElement("span");
  doneSpan.innerText = doneText;
  doneSpan.classList.add("correct");

  const currSpan = document.createElement("span");
  currSpan.innerText = currChar;
  currSpan.classList.add("current");

  const nextSpan = document.createElement("span");
  nextSpan.innerText = nextText;
  nextSpan.classList.add("next");

  referenceEl.innerHTML="";
  [doneSpan, currSpan, nextSpan].forEach(el => referenceEl.appendChild(el));



});


// next to do -- array of string + correct or wrong
// add eventListener for keyDown on inputEl
// add eventListener for keyUp on inputEl
// be able to control text of inputEl
// through the keyDown inputs




