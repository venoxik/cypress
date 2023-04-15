describe("Creating", () => {
  before(function () {
    cy.fixture("todos").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.navigateToHomePage();
  });

  it("Should create new todo", () => {
    cy.addNewToDo(data.todosNames[0]);
    cy.assertTodosVisible(data.todosNames[0]);
  });

  it("Should create multiple new todo", () => {
    data.todosNames.forEach((element) => cy.addNewToDo(element));
    cy.assertTodosVisible(data.todosNames);
  });
});
