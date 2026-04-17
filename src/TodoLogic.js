import { Project } from "./projectMain.js";

import { Todo } from "./TodoMain.js";

export class TodoLogic {
  constructor(uiInstance, container, projectUi) {
    this.ui = uiInstance;
    this.container = container;
    this.projUi = projectUi;

    this.form = document.querySelector("#todo-form");
    this.dialog = document.querySelector("#todo-dialog");
    this.dialog.addEventListener("click", (e) => {
      if (e.target.classList.contains("dialog-close")) {
        this.dialog.close();
        return;
      }
    });

    this.init();
  }
  init() {
    this.mainBtnControl();
    this.formControl();
    this.dialogBtnControl();
  }
  mainBtnControl() {
    this.container.addEventListener("click", (e) => {
      const projectCard = e.target.closest(".project-card");
      if (!projectCard) return;
      const projectId = projectCard.dataset.id;

      if (e.target.classList.contains("add-button")) {
        this.openTodoDialog(projectId);
      }
      if (e.target.classList.contains("show-button")) {
        this.ui.renderTodo(projectId);
      }
      if (e.target.classList.contains("del-project")) {
        this.deletePrj(projectId);
      }
    });
  }

  openTodoDialog(projectid) {
    this.dialog.dataset.activeProject = projectid;
    this.dialog.showModal();
  }
  formControl() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitTodo();
      console.log("this todo is submitted");
    });
  }
  submitTodo() {
    const data = new FormData(this.form);
    const targetProjectId = this.dialog.dataset.activeProject;

    const newTodo = new Todo({
      title: data.get(`title`),
      priority: data.get(`Priority`),
      desc: data.get(`Description`),
    });
    const projects = Project.ProjectStore.find((p) => p.id === targetProjectId);

    if (projects) {
      projects.todos.push(newTodo);
    }

    this.form.reset();
    this.dialog.close();
  }
  updatedProjectStore() {
    return Project.ProjectStore;
  }
  dialogBtnControl() {
    const todoDialog = document.querySelector("#show-todo");
    todoDialog.addEventListener("click", (e) => {
      if (e.target.classList.contains("del-todo")) {
        const todoId = e.target.closest(".del-todo").dataset.id;
        console.log(todoId);
        const projectId = todoDialog.dataset.activeProject;
        this.deleteTodo(projectId, todoId);
      }
      if (e.target.classList.contains("close-todo")) {
        todoDialog.close();
      }
    });
  }
  deleteTodo(projectId, todoId) {
    console.log(Project.ProjectStore);
    const project = Project.ProjectStore.find(
      (project) => project.id === projectId,
    );

    if (project) {
      console.log("Searching for Todo ID:", todoId);

      project.todos = project.todos.filter((todo) => {
        const isMatch = todo.id === todoId;
        return !isMatch;
      });

      this.ui.renderTodo(projectId);
    }
  }
  deletePrj(projectId) {
    const index = Project.ProjectStore.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      Project.ProjectStore.splice(index, 1);
    }
    this.projUi.renderProjects();
  }
}
