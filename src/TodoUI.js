import { Project } from "./projectMain.js";
import { format } from "date-fns";

export class TodoUI {
  constructor() {
    this.dialog = document.querySelector("#show-todo");
    this.todoContainer = document.createElement("div");
    this.dialog.appendChild(this.todoContainer);
  }
  renderTodo(projectId) {
    this.todoContainer.innerHTML = ``;
    this.dialog.dataset.activeProject = projectId;
    const emptyMessage = document.createElement("p");
    const todoList = Project.getTodosByProjectId(projectId);

    if (todoList.length === 0) {
      emptyMessage.textContent = "This todo-list is empty";
      this.todoContainer.appendChild(emptyMessage);
    }

    todoList.forEach((todo) => {
      const createdTodo = this.createTodo(todo);
      this.todoContainer.appendChild(createdTodo);
    });
    console.log(this.dialog);
    this.dialog.showModal();
  }
  helpCreateElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
  }
  createTodo(todo) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    const currentDate = format(todo.createdAt, `MMM do, yyyy`);
    const title = this.helpCreateElement("h5", "todo-title", todo.title);
    const date = this.helpCreateElement("span", "todo-date", currentDate);
    const description = this.helpCreateElement(
      "p",
      "todo-desc",
      todo.description,
    );
    const delBtn = this.helpCreateElement("button", "del-todo", "Delete");
    delBtn.dataset.id = todo.id;

    todoCard.append(title, date, description, delBtn);

    return todoCard;
  }
}
