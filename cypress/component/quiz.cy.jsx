import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react';
import React from 'react';

const mockQuestions = [
    {
        question: "Which of these is NOT a JavaScript data type?",
        answers: [
            { text: "Integer", isCorrect: true },
            { text: "Undefined", isCorrect: false },
            { text: "Boolean", isCorrect: false },
            { text: "String", isCorrect: false }
        ]
    },
    {
        question: "What is the main function of a RESTful API?",
        answers: [
            { text: "Connects databases", isCorrect: false },
            { text: "Manages user authentication", isCorrect: false },
            { text: "Facilitates communication between client and server", isCorrect: true },
            { text: "Provides real-time data updates", isCorrect: false }
        ]
    }
];

describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', mockQuestions).as('getQuestions');
        mount(<Quiz />);
    });

    it('starts the quiz and goes through all questions', () => {
        // Click start
        cy.contains('Start Quiz').click();

        // Wait for questions to load
        cy.wait('@getQuestions');

        // Question 1 is visible
        cy.contains('Which of these is NOT a JavaScript data type?').should('be.visible');
        cy.contains('Integer').click();

        // Question 2 is visible
        cy.contains('What is the main function of a RESTful API?', { timeout: 10000 }).should('be.visible');
        cy.contains('Facilitates communication between client and server').click();

        // Final score page is visible
        cy.contains('Quiz Completed').should('be.visible');
        cy.contains('Your score: 2/2').should('be.visible');
    });
});
