describe("Deleting", () => {
  before(function () {
    cy.fixture("todos").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.createTasksByLocalStorage(data.todosNames, [true, true, true]);
    cy.navigateToHomePage();
  });

  it("Should delete choosen todo", () => {
    cy.assertTodosVisible(data.todosNames);
    cy.deleteToDoByName(data.todosNames[0]);
    data.todosNames
      .slice(1)
      .forEach((element) => cy.assertTodosVisible(element));
    cy.get(`.todo:contains(${data.todosNames[0]})`).should("not.exist");
  });

  it("Should delete completed todos", () => {
    cy.assertTodosVisible(data.todosNames);
    cy.clearCompletedTasks();
    cy.get(".todo").should("not.exist");
  });
});
