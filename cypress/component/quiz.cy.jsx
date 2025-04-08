import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from './Quiz';
import { getQuestions } from '../services/questionApi.js';

// Mock the getQuestions function
jest.mock('../services/questionApi.js');

const mockQuestions = [
  {
    question: "What is JavaScript?",
    answers: [
      { text: "Programming language", isCorrect: true },
      { text: "Database", isCorrect: false },
      { text: "Operating System", isCorrect: false },
      { text: "Text Editor", isCorrect: false },
    ],
    correctAnswer: "Programming language"
  },
  // Add more mock questions if needed
];

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mock the API call to return mock questions
    getQuestions.mockResolvedValue(mockQuestions);
  });

  test('renders start button', () => {
    render(<Quiz />);
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });

  test('fetches and displays questions when quiz starts', async () => {
    render(<Quiz />);
    
    // Click the start button
    fireEvent.click(screen.getByText('Start Quiz'));

    // Wait for the first question to appear
    expect(await screen.findByText(mockQuestions[0].question)).toBeInTheDocument();
  });

  test('increments score on correct answer', async () => {
    render(<Quiz />);
    
    // Start the quiz
    fireEvent.click(screen.getByText('Start Quiz'));

    // Click the correct answer
    fireEvent.click(await screen.findByText(mockQuestions[0].answers[0].text));

    // Check if the score is incremented
    expect(screen.getByText('Your score: 1/1')).toBeInTheDocument();
  });

  test('displays quiz completed message', async () => {
    render(<Quiz />);
    
    // Start the quiz
    fireEvent.click(screen.getByText('Start Quiz'));

    // Answer the first question
    fireEvent.click(await screen.findByText(mockQuestions[0].answers[0].text));

    // Simulate moving to the next question (if you had more questions)
    // Here we just check for the completion message since we only have one question
    expect(await screen.findByText('Quiz Completed')).toBeInTheDocument();
  });
});