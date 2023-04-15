describe("Filtering", () => {
  before(function () {
    cy.fixture("todos").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.createTasksByLocalStorage(data.todosNames, [true, true, false]);
    cy.navigateToHomePage();
  });

  const activeFilter = "Active";
  const completedFilter = "Completed";

  it("Should filter Active todos", () => {
    cy.assertTodosVisible(data.todosNames);
    cy.applyFilter(activeFilter);
    cy.get(".filters a")
      .contains(activeFilter)
      .should("have.class", "selected");
    cy.assertTodosVisible(data.todosNames[2]);
  });

  it("Should filter Completed todos", () => {
    cy.assertTodosVisible(data.todosNames);
    cy.applyFilter(completedFilter);
    cy.get(".filters a")
      .contains(completedFilter)
      .should("have.class", "selected");
    data.todosNames
      .slice(0, 2)
      .forEach((element) => cy.assertTodosVisible(element));
  });
});
