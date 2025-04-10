describe('Test Tech Quiz e2e app test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: [
        {
          question: 'What is the main function of a RESTful API?',
          answers: [
            { text: 'Facilitates communication between client and server', isCorrect: true },
            { text: 'Connects databases', isCorrect: false }
          ]
        },
        {
          question: 'Which of these is NOT a JavaScript data type?',
          answers: [
            { text: 'Integer', isCorrect: true },
            { text: 'Boolean', isCorrect: false }
          ]
        }
      ]
    }).as('getQuestions');

    cy.visit('/');
  });

  it('loads the quiz, questions, answers, and shows score', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Check first question
    cy.contains('What is the main function of a RESTful API?').should('be.visible');
    cy.contains('Facilitates communication between client and server').click();

    // Check second question
    cy.contains('Which of these is NOT a JavaScript data type?').should('be.visible');
    cy.contains('Integer').click();

    // Final score page
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 2/2').should('be.visible');
  });
});