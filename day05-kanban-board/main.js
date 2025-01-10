const kanbanEl = document.querySelector(".kanban");

const todoEl = document.getElementById("todo");
const addTodoButtonEl = document.getElementById("add-todo");

const inProgressEl = document.getElementById("inProgress");
const addInProgressButtonEl = document.getElementById("add-in-progress");

const doneEl = document.getElementById("done");
const addDoneButtonEl = document.getElementById("add-done");

const tasks = {
  todo: [],
  inProgress: [],
  done: [],
};

const addTask = (task) => {
  tasks.todo.push(task);
};

const moveTask = (task, status) => {
  const currentStatus = getStatus(task);
  if (currentStatus) {
    tasks[currentStatus].splice(tasks[currentStatus].indexOf(task), 1);
  }
  tasks[status].push(task);
};

const getStatus = (task) => {
  for (const status in tasks) {
    if (tasks[status].includes(task)) {
      return status;
    }
  }
  return null;
};

const getStatusElement = (status) => {
  switch (status) {
    case "todo":
      return todoEl;
    case "inProgress":
      return inProgressEl;
    case "done":
      return doneEl;
    default:
      return null;
  }
};

const renderTask = (task, status) => {
  const targetEl = getStatusElement(status);
  const listItem = document.createElement("li");
  listItem.classList.add("board__card");
  listItem.innerHTML = `
        <button class="board__next-button">&rarr;</button>
        <h4>${task.title}</h4>
        <hr />
        <p>${task.content}</p>
    `;

  const nextButtonEl = listItem.querySelector(".board__next-button");
  nextButtonEl.addEventListener("click", () => {
    const nextStatus = getNextStatus(status);
    if (nextStatus) {
      moveTask(task, nextStatus);
      rerender();
    }
  });

  targetEl.appendChild(listItem);
};

const getNextStatus = (status) => {
  switch (status) {
    case "todo":
      return "inProgress";
    case "inProgress":
      return "done";
    case "done":
      return null;
    default:
      return null;
  }
};

const renderAddTask = () => `
    <li class="board__card">
        <form id="add-card-form">
            <input id="title-input" type="text" placeholder="제목..." required />
            <hr />
            <textarea placeholder="내용..." required></textarea>
            <button id="add-card-button">추가</button>
        </form>
    </li>
`;

const rerender = () => {
  todoEl.innerHTML = "";
  tasks.todo
    .slice()
    .reverse()
    .forEach((task) => renderTask(task, "todo"));
  inProgressEl.innerHTML = "";
  tasks.inProgress
    .slice()
    .reverse()
    .forEach((task) => renderTask(task, "inProgress"));
  doneEl.innerHTML = "";
  tasks.done
    .slice()
    .reverse()
    .forEach((task) => renderTask(task, "done"));
};

const handleAddTask = () => {
  if (todoEl.querySelector("form")) return;
  todoEl.innerHTML = renderAddTask() + todoEl.innerHTML;

  const titleInput = document.getElementById("title-input");
  titleInput.focus();

  const addCardForm = document.getElementById("add-card-form");
  addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = addCardForm.querySelector("input").value;
    const content = addCardForm.querySelector("textarea").value;
    addTask({ title, content });
    rerender();
  });
};

const init = () => {
  rerender();
  addTodoButtonEl.addEventListener("click", handleAddTask);
};

init();
