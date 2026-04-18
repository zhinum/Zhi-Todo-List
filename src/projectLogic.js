import { Project } from "./projectMain.js";
export class projectLogic {
  constructor(uiInstance) {
    this.ui = uiInstance;
    this.prjForm = document.querySelector("#prj-form");
    this.prjDialog = document.querySelector("#prj-dialog");
    this.prjDialog.addEventListener("click", (e) => {
      if (e.target.classList.contains("prj-close")) {
        this.prjDialog.close();
        return;
      }
    });
    this.init();
  }
  init() {
    this.addButtonControl();
    this.FormControl();
  }

  addButtonControl() {
    const addBtn = document.querySelector(".add-prj");
    addBtn.addEventListener("click", () => {
      this.openPrjDialog();
    });
  }

  openPrjDialog() {
    this.prjDialog.showModal();
  }

  FormControl() {
    this.prjForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this.submitPrj();

      console.log(this.updatedPrjStore());
    });
  }
  submitPrj() {
    const data = new FormData(this.prjForm);
    const newPrj = new Project({ name: data.get(`name`) });

    const store = Project.ProjectStore;
    store.push(newPrj);

    console.log(Project.ProjectStore.length);
    Project.saveToLocalstorage();
    this.ui.renderProjects();
    this.prjForm.reset();
    this.prjDialog.close();
  }
  updatedPrjStore() {
    return Project.ProjectStore;
  }
}
