describe("Checking", () => {
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

  it("Should check todo", () => {
    cy.assertTodosVisible(data.todosNames[1]);
    cy.checkToDo(data.todosNames[1], true);
  });

  it("Should unchecked todo", () => {
    cy.assertTodosVisible(data.todosNames[0]);
    cy.checkToDo(data.todosNames[0], false);
  });
});
