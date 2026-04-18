export class Project {
  static _projectStore = [];
  constructor({ name }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
    this.createdAt = new Date();
  }
  static saveToLocalstorage() {
    if (this._projectStore.length === 3) {
      console.warn("Warning: Attempting to save an EMPTY store.");
      console.trace();
    }
    localStorage.setItem("zhiTodoApp", JSON.stringify(Project._projectStore));
  }
  static loadFromLocalStorage() {
    const savedJSON = localStorage.getItem("zhiTodoApp");
    if (savedJSON) {
      const rawData = JSON.parse(savedJSON);
      this._projectStore = rawData.map((project) => {
        project.createdAt = new Date(project.createdAt);

        project.todos = project.todos.map((todo) => {
          todo.createdAt = new Date(todo.createdAt);
          return todo;
        });
        return project;
      });
    }
  }
  static get ProjectStore() {
    return this._projectStore;
  }
  static getTodosByProjectId(projectId) {
    const project = this._projectStore.find(
      (project) => project.id === projectId,
    );
    if (project) return project.todos;
  }
}
