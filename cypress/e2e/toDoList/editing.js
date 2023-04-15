describe("Editing", () => {
  before(function () {
    cy.fixture("todos").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.createTasksByLocalStorage(
      [data.todosNames[0], data.todosNames[1]],
      [true, false]
    );
    cy.navigateToHomePage();
  });

  const checked = "checked";
  const unchecked = "unchecked";

  it("Should edit checked todo", () => {
    cy.assertTodosVisible(data.todosNames[0]);
    cy.editToDo(data.todosNames[0], checked);
    cy.assertTodosVisible(checked);
  });

  it("Should edit unchecked todo", () => {
    cy.assertTodosVisible(data.todosNames[1]);
    cy.editToDo(data.todosNames[1], unchecked);
    cy.assertTodosVisible(unchecked);
  });
});
