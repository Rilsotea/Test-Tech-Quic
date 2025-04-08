describe('Quiz Application', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('http://localhost:3001');
  });

  it('should start the quiz and display questions', () => {
    // Click the start quiz button
    cy.contains('Start Quiz').click();

    // Verify that the first question is displayed
    cy.contains("What is JavaScript?").should('be.visible');
  });

  it('should allow answering questions and show score', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();

    // Answer the first question correctly
    cy.contains("Programming language").click();

    // Verify that the score is updated
    cy.contains('Your score: 1/1').should('be.visible');

    // Check for quiz completion message
    cy.contains('Quiz Completed').should('be.visible');
  });

  it('should allow taking a new quiz', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();

    // Answer the first question correctly
    cy.contains("Programming language").click();

    // Verify completion message
    cy.contains('Quiz Completed').should('be.visible');

    // Click to take a new quiz
    cy.contains('Take New Quiz').click();

    // Verify that the quiz has restarted
    cy.contains('Start Quiz').should('be.visible');
  });
});