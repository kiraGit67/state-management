"use strict";

// Zugriff auf Elemente vorbereiten
const button = document.querySelector("button");

const data = {
  lightOn: false,
  buttonText: ["Licht An", "Licht Aus"],
};

button.innerText = data.buttonText[0];

// Text Toggeln zwischen "Licht an" und "Licht aus"
button.addEventListener("click", () => {
  data.lightOn = !data.lightOn;
  console.log(data.lightOn);

  if (data.lightOn) {
    button.innerText = data.buttonText[1];
  } else {
    button.innerText = data.buttonText[0];
  }
});
