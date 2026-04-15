import { Project } from "./projectMain.js";

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
  createTodo(todo) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.innerHTML = `<h5>${todo.title}</h5>
    <p>${todo.description}</p>
    <button class="del-todo" data-todo-id="${todo.id}">Delete</button>
    
`;
    return todoCard;
  }
}
