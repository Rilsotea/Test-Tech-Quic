import { mount } from 'cypress/react';
import Quiz from '../../src/components/Quiz';

describe('Quiz Component', () => {
    it('renders and allows the user to start the quiz', () => {
        mount(<Quiz />); // Mount the Quiz component

        cy.get('button').contains('Start Quiz').click(); // Simulate starting the quiz

        cy.get('.question').should('exist'); // Check if a question is displayed
    });

    it('advances to the next question when answered', () => {
        mount(<Quiz />); // Mount the Quiz component

        cy.get('button').contains('Start Quiz').click(); // Start the quiz

        cy.get('.answer-button').first().click(); // Simulate answering the first question

        // Check if the next question appears (replace 'Next Question Text' with actual text)
        cy.get('.question').should('not.have.text', 'Question 1'); // Adjust based on your actual question text
        cy.get('.question').should('contain.text', 'Next Question Text'); // Check for the actual text of the next question
    });
});
