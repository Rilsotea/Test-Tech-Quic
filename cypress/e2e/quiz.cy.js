describe('<Quiz /> E2E Test', () => {
  beforeEach(() => {
    // Intercept the API call to mock the response
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: [
        {
          question: 'Which of these is NOT a JavaScript data type?',
          answers: [
            { text: 'Integer', isCorrect: true },
            { text: 'Boolean', isCorrect: false }
          ]
        },
        {
          question: 'What is the main function of a RESTful API?',
          answers: [
            { text: 'Facilitates communication between client and server', isCorrect: true },
            { text: 'Connects databases', isCorrect: false }
          ]
        }
      ]
    }).as('getQuestions');

    // Visit the application page
    cy.visit('/'); // Adjust this to the correct path of your application
  });

  it('Starts the Quiz and Completes It', () => {
    // Start the quiz
    cy.contains('Start Quiz').click();

    // Wait for the questions to load
    cy.wait('@getQuestions');

    // Check the first question and answer it
    cy.contains('Which of these is NOT a JavaScript data type?').should('be.visible');
    cy.contains('1').click();

    // Check the second question and answer it
    cy.contains('What is the main function of a RESTful API?').should('be.visible');
    cy.contains('1').click();

    // Verify the final score page
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score: 2/2').should('be.visible');
    
    // Check the button to restart the quiz
    cy.contains('Take New Quiz').should('be.visible');
    cy.contains('Take New Quiz').should('be.visible').click();
  });
});