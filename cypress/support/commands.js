// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

Cypress.Commands.add("navigateToHomePage", () => {
  cy.visit("/");
  cy.get("h1:contains(todos)").should("be.visible");
});

Cypress.Commands.add(
  "createTasksByLocalStorage",
  (taskNames, completedValues) => {
    const todos = taskNames.map((taskName, index) => {
      return { title: taskName, completed: completedValues[index] };
    });

    cy.window().then((win) => {
      win.localStorage.setItem("todos-vuejs", JSON.stringify(todos));
    });
  }
);

Cypress.Commands.add("addNewToDo", (newToDo) => {
  cy.get(".new-todo").type(`${newToDo}{enter}`);
});

Cypress.Commands.add("assertTodosVisible", (todoName) => {
  cy.get(".todo-list .todo").each(($el, index, $list) => {
    if ($el.text().includes(todoName)) {
      cy.wrap($el).should("include.text", todoName);
    }
  });
});

Cypress.Commands.add("editToDo", (toDoToEdit, newToDo) => {
  cy.get(`.todo:contains(${toDoToEdit})`)
    .dblclick()
    .type(`{selectall}{backspace}${newToDo}{enter}`);
});

Cypress.Commands.add("checkToDo", (toDoName, shouldCheck) => {
  const checkboxSelector = cy
    .get(`.todo:contains(${toDoName})`)
    .find('[type="checkbox"]');
  if (shouldCheck) {
    checkboxSelector.check().should("be.checked");
  } else {
    checkboxSelector.uncheck().should("not.be.checked");
  }
});

Cypress.Commands.add("applyFilter", (filterName) => {
  cy.get(`.filters a:contains(${filterName})`).click();
});

Cypress.Commands.add("deleteToDoByName", (toDoName) => {
  cy.get(`.todo:contains(${toDoName})`).find(".destroy").click({ force: true });
});

Cypress.Commands.add("clearCompletedTasks", () => {
  cy.get(".clear-completed:contains(Clear completed)").click();
});

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
