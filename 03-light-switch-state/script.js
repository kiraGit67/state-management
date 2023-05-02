"use strict";

// Zugriff auf Elemente vorbereiten
const button = document.querySelector("button");

const data = {
  lightOn: true,
  buttonText: ["Licht An", "Licht Aus"],
};

button.innerText = data.buttonText[1];

// Text Toggeln zwischen "Licht an" und "Licht aus"
button.addEventListener("click", () => {
  data.lightOn = !data.lightOn;
  console.log(data.lightOn);

  if (data.lightOn) {
    button.innerText = data.buttonText[1];
    document.body.classList.remove("dark");
  } else {
    button.innerText = data.buttonText[0];
    document.body.classList.add("dark");
  }
});
