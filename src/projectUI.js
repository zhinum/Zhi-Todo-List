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
  helpCreateElements(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
  }
  createCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.dataset.id = project.id;

    const prjTitle = this.helpCreateElements("h3", "prj-title", project.title);

    const prjDate = this.helpCreateElements(
      "span",
      "prj-date",
      project.createdAt.toLocaleDateString(),
    );

    const btnDiv = this.helpCreateElements("div", "card-actions");

    const delProjectBtn = this.helpCreateElements(
      "button",
      "del-project",
      "Delete Project",
    );

    const addProjectBtn = this.helpCreateElements(
      "button",
      "add-button",
      "Add Todo",
    );

    const showProjectBtn = this.helpCreateElements(
      "button",
      "show-button",
      "Show Todo",
    );

    btnDiv.append(delProjectBtn, addProjectBtn, showProjectBtn);
    card.append(prjTitle, prjDate, btnDiv);
    return card;
  }
}
