import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react';


describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', {fixture:'questions.json', statusCode: 200}).as('getQuestions');
        mount(<Quiz />);
    });

    it('starts the quiz and goes through all questions', () => {
        // Click start
        cy.contains('Start Quiz').click();

        // Wait for questions to load
        cy.wait('@getQuestions');

        // Question 1 is visible
        cy.contains('Which of these is NOT a JavaScript data type?').should('be.visible');
        cy.contains('2').click();

        // Question 2 is visible
        cy.contains('What is the main function of a RESTful API?', { timeout: 10000 }).should('be.visible');
        cy.contains('2').click();

        // Final score page is visible
        cy.contains('Quiz Completed').should('be.visible');
        cy.contains('Your score: 2/2').should('be.visible');
    });
});
