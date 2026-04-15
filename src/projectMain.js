export class Project {
  static _projectStore = [];
  constructor({ name }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
    this.createdAt = new Date();
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
