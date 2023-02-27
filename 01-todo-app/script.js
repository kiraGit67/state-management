"use strict";

//Variable für den Status der ToDo-Liste festlegen
const toDoState = {
  toDos: [
    { description: "Learn HTML", done: false },
    { description: "Learn CSS", done: true },
    { description: "Learn JavaScript", done: false },
  ],
};

// Funktion, um jedes ToDo mit einer ID zu versehen
function setToDoID() {
  toDoState.toDos.forEach((toDo) => {
    const toDoNum = parseInt(toDoState.toDos.indexOf(toDo)) + 1;
    const toDoName = toDo.description.replaceAll(" ", "");
    toDo.id = "toDo" + toDoName;
  });
}

//Funktion, um den Status der ToDos sichtbar zu machen
function renderToDos() {
  const toDoList = document.querySelector("#toDo-list");
  toDoList.innerHTML = "";

  toDoState.toDos.forEach((toDo) => {
    const toDoLi = document.createElement("li");

    toDoLi.toDoObj = toDo;

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = toDo.done;
    toDoLi.appendChild(checkBox);

    const toDoText = document.createTextNode(toDo.description);
    toDoLi.appendChild(toDoText);

    if (toDo.done === true) {
      toDoLi.classList.add("doneToDo");
    }

    toDoList.appendChild(toDoLi);
  });
  setToDoID();
}

renderToDos();

// Funktion, um den aktuellen Stand der toDoApp zu speichern
function localStorageToDos(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

localStorageToDos("toDos", toDoState.toDos);

//localStorage.setItem("toDos", JSON.stringify(toDoState.toDos));

const toDoList = document.querySelector("#toDo-list");

toDoList.addEventListener("change", (evt) => {
  const checkBoxElement = evt.target;
  const liElement = checkBoxElement.parentElement;
  const toDoElement = liElement.toDoObj;
  console.log(toDoElement);

  toDoElement.done = checkBoxElement.checked;
  console.log(toDoElement.done);

  liElement.classList.toggle("doneToDo");

  localStorageToDos("toDos", toDoState.toDos);
});

// Variablen für das ToDo-Eingabefeld,
const newToDo = document.querySelector("#new-toDo");
// den Add-Button
const addToDoButton = document.querySelector("#add-toDo");
// und den RemoveButton
const removeDoneButton = document.querySelector("#remove-done-toDos");
// und den DeleteStorageButton
const deleteLocalStorageButton = document.querySelector(
  "#delete-local-storage"
);

//EventListener für die Speicherung neuer ToDos
addToDoButton.addEventListener("click", () => {
  console.log(newToDo.value);

  for (let toDoItem of toDoState.toDos) {
    if (newToDo.value.toLowerCase() === toDoItem.description.toLowerCase()) {
      return;
    }
  }

  if (newToDo.value !== "") {
    toDoState.toDos.push({ description: newToDo.value, done: false });
  }
  console.log(toDoState.toDos);

  renderToDos();
  localStorageToDos("toDos", toDoState.toDos);
  newToDo.value = "";
});

//EventListener für die Löschung erledigter ToDos (done ToDos)
removeDoneButton.addEventListener("click", () => {
  toDoState.toDos.forEach((toDo) => {
    if (toDo.done === true) {
      console.log(toDo);
      toDoState.toDos.splice(toDoState.toDos.indexOf(toDo), 1);
    }
  });
  renderToDos();
  localStorageToDos("toDos", toDoState.toDos);
});

//EventListener für die Löschung des lokalen Speichers(localStorage)
deleteLocalStorageButton.addEventListener("click", () => {
  localStorage.clear();
});
