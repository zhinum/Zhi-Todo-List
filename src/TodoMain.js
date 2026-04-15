export class Todo {
  constructor(config) {
    this.id = crypto.randomUUID();
    this.title = config.title;
    this.description = config.description || "No description provided.";
    this.priority = config.priority || "medium";
    this.createdAt = new Date();
  }
}
