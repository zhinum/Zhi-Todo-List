import "./todo.css";
import { projectLogic } from "./projectLogic.js";
import { projectUI } from "./projectUI.js";
import { Project } from "./projectMain.js";
import { TodoLogic } from "./TodoLogic.js";
import { TodoUI } from "./TodoUI.js";
import { Todo } from "./TodoMain.js";

const content = document.querySelector("#content");
const projectsDisplay = new projectUI(content, Project.ProjectStore);
const projectHandler = new projectLogic(projectsDisplay, content);
projectsDisplay.renderProjects();

const todoDisplay = new TodoUI();
const todoHandler = new TodoLogic(todoDisplay, content, projectsDisplay);

function showDemoData() {
  const mission = new Project({ name: " Mission Impossible" });
  mission.todos.push(
    new Todo({
      title: "Stop Bismach",
      priority: "High",
      description:
        "Bismach is about to denonate a dirty boom, your mission, should you choose to accept",
    }),
    new Todo({
      title: "Assasinate the president",
      priority: "Medium",
      description: "Presidents a deep fake",
    }),
  );
  const gowProject = new Project({
    name: "The Path to Jotunheim",
  });
  gowProject.todos.push(
    new Todo({
      title: "Hunt with the Boy",
      priority: "High",
      description: "Teach Atreus how to track deer. Do not lose your temper.",
    }),
    new Todo({
      title: "Sharpen Leviathan Axe",
      priority: "Urgent",
      description:
        "Visit Brok and Sindri for a runic upgrade. Needs more frost damage.",
    }),
  );
  const lodr = new Project({
    name: "Journey to Mount Doom",
  });

  lodr.todos.push(
    new Todo({
      title: "Gather the Fellowship",
      priority: "High",
      description:
        "Meet at Rivendell. Make sure Boromir doesn't look at the Ring too much.",
    }),
    new Todo({
      title: "Prepare Second Breakfast",
      priority: "Medium",
      description:
        "Pack lembas bread and some nice crispy bacon for the Hobbits.",
    }),
  );

  Project.ProjectStore.push(mission, gowProject, lodr);
  console.log(Project.ProjectStore);
}
showDemoData();
projectsDisplay.renderProjects();
