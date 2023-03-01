"use strict";

const toDoState = {
  filter: "",
  toDos: [],
};

// Local Storage
const toDosFromLocalStorageToObject = JSON.parse(localStorage.getItem("toDos"));
console.log(toDosFromLocalStorageToObject);

if (Array.isArray(toDosFromLocalStorageToObject)) {
  toDoState.toDos = toDosFromLocalStorageToObject;
}

// toDos aktualisieren
function updateLocalStorage() {
  localStorage.setItem("toDos", JSON.stringify(toDoState.toDos));
}

// @TODO render toDos
// <li><input type="checkbox">Learn HTML</li>

function renderItem(toDo) {
  //Li-Element
  const toDoLi = document.createElement("li");

  //Styling
  toDoLi.classList.add("toDo-item");

  //Checkbox Element
  const toDoCheckBox = document.createElement("input");
  toDoCheckBox.type = "checkbox";
  toDoCheckBox.checked = toDo.done;

  // create TextNode
  const toDoText = document.createTextNode(toDo.description);

  if (toDo.done) {
    toDoLi.classList.toggle("toDoDone");
  }

  toDoCheckBox.addEventListener("change", () => {
    toDo.done = !toDo.done;
    updateLocalStorage();
    render();
  });

  // Put all Elements together
  toDoLi.append(toDoCheckBox, toDoText);
  /**
   * Same like two lines of appendChild
   * toDoLi.appendChild(toDoCheckBox);
   * toDoLi.appendChild(toDoText);
   */

  return toDoLi;
}

// @TODO Create Form to add new ToDo
function addNewToDo() {
  //Get Input Field Value
  const newToDoInput = document.querySelector("#new-toDo-input");

  //Get ToDoList ul Element - done
  //const toDoList = document.querySelector("#toDoList");

  for (let toDoItem of toDoState.toDos) {
    if (
      newToDoInput.value.toLowerCase() === toDoItem.description.toLowerCase()
    ) {
      return;
    }
  }

  if (newToDoInput.value !== "") {
    toDoState.toDos.push({
      id: +new Date(),
      description: newToDoInput.value,
      done: false,
    });

    updateLocalStorage();
  }

  newToDoInput.value = "";
}

// @ToDo filter ToDoList
const filterButtons = document.querySelectorAll("input[type='radio']");
console.log(filterButtons);

filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("change", function (e) {
    toDoState.filter = e.target.value;
    console.log(toDoState.filter);
    render();
  });
});

// @ToDo render ToDoList
function render() {
  const toDoList = document.querySelector("#toDoList");
  toDoList.innerHTML = "";
  /**/
  // toDos filtern
  // done
  const doneToDos = toDoState.toDos.filter((toDo) => toDo.done === true);
  console.log(doneToDos);

  // open
  const openToDos = toDoState.toDos.filter((toDo) => toDo.done === false);
  console.log(openToDos);

  let stateArray;

  if (toDoState.filter === "done") {
    stateArray = doneToDos;
  } else if (toDoState.filter === "open") {
    stateArray = openToDos;
  } else {
    stateArray = toDoState.toDos;
  }

  for (let toDo of stateArray) {
    const newToDoItem = renderItem(toDo);
    toDoList.append(newToDoItem);
  }
}

// @ToDo Submit form to add ToDo
const addToDoForm = document.querySelector("#add-toDo-form");

addToDoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  addNewToDo();
  render();
});

// @ToDo Button to remove done toDos
const removeDoneToDos = document.querySelector("#remove-done-toDos");

removeDoneToDos.addEventListener("click", function () {
  for (let toDo of toDoState.toDos) {
    if (toDo.done === true) {
      toDoState.toDos.splice(toDoState.toDos.indexOf(toDo), 1);
    }
  }
  updateLocalStorage();
  render();
});

render();
