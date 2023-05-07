"use strict";

const lottoNumbers = [];

const numbersContainer = document.querySelector(".numbers");
const addRandomButton = document.querySelector("#random-button");
const resetButton = document.querySelector("#reset-button");

addRandomButton.addEventListener("click", () => {
  const newNumber = getRandomNumber(1, 49);

  if (allowAddNumber(lottoNumbers) && !lottoNumbers.includes(newNumber)) {
    lottoNumbers.push(newNumber);
  }

  console.log(lottoNumbers);
  renderLottoNumbers(lottoNumbers, numbersContainer);
});

resetButton.addEventListener("click", () => {
  console.log(lottoNumbers.length);
  if (allowReset(lottoNumbers)) {
    lottoNumbers.length = 0;
  }
  console.log(lottoNumbers.length);
  console.log(lottoNumbers);
  renderLottoNumbers(lottoNumbers, numbersContainer);
});

function renderLottoNumbers(numbers, containerElement) {
  containerElement.innerHTML = "";

  for (const number of numbers) {
    const numDiv = document.createElement("div");
    numDiv.classList.add("number");
    numDiv.innerText = number;

    containerElement.appendChild(numDiv);
  }
}

function allowAddNumber(numbers) {
  return numbers.length < 6;
}

function allowReset(numbers) {
  return numbers.length === 6;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//renderLottoNumbers(lottoNumbers, numbersContainer);
