/// <reference types="cypress" />


describe("Test ToDo List", () => {
  before(function () {
    cy.fixture("todos").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.navigateToHomePage();
  });

  it("Should add new todo, mark as complete and clear complete", () => {
    cy.addNewToDo(data.todosNames[0]);
    cy.assertTodosVisible(data.todosNames[0]);
    cy.assertCountOfTodos('1');
    cy.checkToDo(data.todosNames[0]);
    cy.assertTodoChecked(data.todosNames[0]);
    cy.getClearCompletedButtton().click();
    cy.assertTodosNotExist();

  });

  it("Should add multiple new todo, mark as complete and clear complete", () => {
    data.todosNames.forEach(element => cy.addNewToDo(element));
    data.todosNames.forEach(element => cy.assertTodosVisible(element));
    cy.assertCountOfTodos('3');
    cy.clickToggleAllButton();
    data.todosNames.forEach(element => cy.assertTodoChecked(element));
    cy.getClearCompletedButtton().click();
    cy.assertTodosNotExist();

  });

  it("Should add new todo, and edit name", () => {
    cy.addNewToDo(data.todosNames[0]);
    cy.assertTodosVisible(data.todosNames[0]);
    cy.assertCountOfTodos('1');
    cy.editToDo(data.todosNames[0], data.todosNames[1]);
    cy.assertTodosVisible(data.todosNames[1]);

  });

  it("Should add 2 new todo, mark 1 as completed and check active and completed lists", () => {
    data.todosNames.slice(0, 2).forEach(element => cy.addNewToDo(element));
    data.todosNames.slice(0, 2).forEach(element => cy.assertTodosVisible(element));
    cy.assertCountOfTodos('2');
    cy.checkToDo(data.todosNames[0]);
    cy.assertTodoChecked(data.todosNames[0]);
    cy.clickFooterButton('Completed');
    cy.assertTodosVisible(data.todosNames[0]);
    cy.assertTodoChecked(data.todosNames[0]);
    cy.clickFooterButton('Active');
    cy.assertTodosVisible(data.todosNames[1]);
    cy.assertTodoNotChecked(data.todosNames[1]);

  });
});

Cypress.Commands.add("addNewToDo", (newToDo) => {
    cy.get('.new-todo').type(`${newToDo}{enter}`);
    
  });

  Cypress.Commands.add("clickFooterButton", (buttonName) => {
    cy.get(`.filters a:contains(${buttonName})`).click();
    
  });

  Cypress.Commands.add("editToDo", (toDoToEdit, newToDo) => {
    cy.get(`.todo:contains(${toDoToEdit})`).dblclick().type(`{selectall}{backspace}${newToDo}{enter}`);
    
  });

  Cypress.Commands.add("checkToDo", (toDoName) => {
    cy.get(`.todo:contains(${toDoName})`).find('[type="checkbox"]').check();
    
  });

Cypress.Commands.add("navigateToHomePage", () => {
  cy.visit("/");
  cy.get("h1:contains(todos)").should("be.visible");
});

Cypress.Commands.add("assertTodosVisible", todoName => {
    cy.get(".todo-list .todo").each(($el, index, $list) => {
        if($el.text().includes(todoName)) {
            cy.wrap($el).should('include.text', todoName);
        }
    });
    
})

Cypress.Commands.add("assertCountOfTodos", (toDoCount) => {
    cy.get(`.todo-count:contains(${toDoCount})`).should('be.visible');
    
  });

  Cypress.Commands.add("getClearCompletedButtton", () => {
    return cy.get('.clear-completed:contains(Clear completed)');
    
  });

  Cypress.Commands.add("assertTodosNotExist", () => {
   cy.get('.todo').should('not.exist');
    
  });

  Cypress.Commands.add("clickToggleAllButton", () => {
    cy.get('[for="toggle-all"]').click();
     
   });

   Cypress.Commands.add("assertTodoChecked", (toDoName) => {
    cy.get(`.todo:contains(${toDoName})`).find('[type="checkbox"]').should('be.checked');
     
   });

   Cypress.Commands.add("assertTodoNotChecked", (toDoName) => {
    cy.get(`.todo:contains(${toDoName})`).find('[type="checkbox"]').should('not.be.checked');
     
   });
 
