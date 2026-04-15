export class projectUI {
  constructor(container, store) {
    this.store = store;

    this.container = container;
    this.cardContainer = document.createElement("div");
    this.cardContainer.classList.add("project-container");
    this.container.appendChild(this.cardContainer);
  }

  renderProjects() {
    this.cardContainer.innerHTML = "";
    console.log(this.store);
    console.log(this.store.length);
    this.store.forEach((project) => {
      const card = this.createCard(project);
      this.cardContainer.appendChild(card);
    });
  }
  createCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.dataset.id = project.id;
    card.innerHTML = `<h3>${project.name}</h3>
    
    <span>${project.createdAt.toLocaleDateString()}</span>
    
    <div class="card-actions">
      <button class="del-project">Delete Project</button>
      <button class="add-button">Add Todo</button>
      <button class="show-button">Show Todo</button>
    </div>
    
        `;
    return card;
  }
}
