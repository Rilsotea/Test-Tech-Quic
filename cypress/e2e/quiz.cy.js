describe("Tech Quiz App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("starts the quiz and completes it", () => {
      cy.contains("Start Quiz").click();
      cy.contains("What is React?").should("be.visible");
      cy.contains("A library").click();
      cy.contains("Quiz Over!").should("be.visible");
      cy.contains("Start New Quiz").click();
      cy.contains("What is React?").should("be.visible");
    });
  });