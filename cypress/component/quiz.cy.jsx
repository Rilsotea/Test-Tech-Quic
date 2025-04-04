import React from "react";
import { Quiz } from "../../src/components/Quiz";
import { mount } from "cypress/react18";

describe("Quiz Component", () => {
    const mockQuestions = [
        {
            question: "What is React?",
            answers: [
                { text: "A JavaScript library for building user interfaces", correct: true },
                { text: "A programming language", correct: false },
                { text: "A CSS framework", correct: false },
                { text: "A database", correct: false }
            ]
        }
    ]
});

it("renders the first question", () => {
    mount(<Quiz questions={mockQuestions} />);
    cy.contains("What is React?").should("be.visible");
});


it("answers a question and proceeds", () => {
    mount(<Quiz questions={mockQuestions} />);
    cy.contains("A library").click();
    cy.contains("Quiz Over! Your score: 1/1").should("be.visible");
});

