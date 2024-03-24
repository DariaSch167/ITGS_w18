const taskInput = document.querySelector(".input-form");
const inputError = document.querySelector(".input-error");
const listItems = document.querySelector(".list-items");
const emptyListError = document.querySelector(".list-empty");
const buttonAdd = document.querySelector(".input-add");
const buttonClear = document.querySelector(".list-clear");

// Массив с задачами из Local storage
let tasksListJson = localStorage.getItem("tasksList");
let tasksList = tasksListJson ? JSON.parse(tasksListJson) : [];

// Объект для создания новой задачи
class Task {
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }
}

// Создание HTML-контейнера под задачу
let listItem;
let itemCheckBox;
let itemLabel;

function createHTML() {
  listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItems.append(listItem);

  itemCheckBox = document.createElement("input");
  itemCheckBox.type = "checkbox";
  itemCheckBox.addEventListener("change", checkStatus);
  listItem.append(itemCheckBox);

  itemLabel = document.createElement("label");
  itemCheckBox.before(itemLabel);
}

// Обработка добавления нового задания
function addTask() {
  inputError.textContent = "";
  if (taskInput.value.trim() === "") {
    inputError.textContent = "Задача не введена";
  } else {
    emptyListError.textContent = "";
    buttonClear.disabled = false;
    let newTask = new Task(taskInput.value, false);
    tasksList.push(newTask);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    taskInput.value = "";

    createHTML();

    itemCheckBox.id = tasksList.length;
    itemCheckBox.checked = newTask.status;

    itemLabel.setAttribute("for", tasksList.length);
    itemLabel.textContent = newTask.name;
  }
}

buttonAdd.addEventListener("click", addTask);

// Обработка очищения списка дел
function clearAllTasks() {
  localStorage.removeItem("tasksList");
  location.reload();
}

buttonClear.addEventListener("click", clearAllTasks);

// Для отображения задач из Local storage при перезагрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  emptyListError.textContent = "";
  buttonClear.disabled = false;

  if (tasksList.length === 0) {
    emptyListError.textContent = "Нет задач";
    buttonClear.disabled = true;
  } else {
    tasksList.forEach(function (task) {
      createHTML();

      itemCheckBox.id = tasksList.indexOf(task) + 1;
      itemCheckBox.checked = task.status;

      itemLabel.setAttribute("for", tasksList.indexOf(task) + 1);
      itemLabel.textContent = task.name;
    });
  }
});

// Сохранение изменений чекбоксов
function checkStatus() {
  let newStatus = this.checked;
  tasksList[this.id - 1].status = newStatus;
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
}
