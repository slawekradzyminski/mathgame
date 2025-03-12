# Math Game Enhancement Plan

Below is a highly detailed implementation plan for updating your Math Game to have a refined user experience (UX) similar to your Geography Quiz application, while omitting internationalization (i18n) and theme switching. The focus is on:

- Providing a more polished UI/UX
- Highlighting selected and correct answers in an appealing way
- Showing a visually engaging summary screen
- Improving game structure and code organization to parallel the approach used in your "geogame"

## 1. Overall Project Structure

You already have a structure like:

```
slawekradzyminski-mathgame/
├── public/
├── src/
│   ├── components/
│   │   ├── App.tsx
│   │   ├── QuestionCard.tsx
│   │   └── Summary.tsx
│   ├── hooks/
│   │   └── useMathGame.ts
│   ├── pages/
│   │   └── GamePage.tsx
│   ├── tests/
│   │   ├── App.test.tsx
│   │   ├── GamePage.test.tsx
│   │   ├── QuestionCard.test.tsx
│   │   ├── Summary.test.tsx
│   │   └── useMathGame.test.tsx
│   └── types/
│       └── Question.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

We will refine these files and add new subfolders as needed. For instance:

```
src/components/QuestionCard/QuestionCard.tsx
src/components/QuestionCard/QuestionCard.css
src/components/Summary/Summary.tsx
src/components/Summary/Summary.css
```

This separation helps you keep styling close to the component (similar to geogame's approach).

## 2. Planning the Core Features

### Quiz Flow

- The game asks 10 random math questions (for example: addition, subtraction, multiplication).
- Each question has 4 multiple-choice answers.
- The user selects one answer.
- The game transitions to the next question.

### Highlighting Feedback

- Once the user clicks an answer, we immediately highlight it as correct (green) or incorrect (red).
- If incorrect, also highlight the correct one in green.
- Delay a little (e.g. 1–2 seconds) before moving on to the next question (like your geogame).

### Summary Screen

- After 10 questions, display a summary listing:
  - Correct vs. total score (e.g., You scored 7 / 10!)
  - For each question, show the user's chosen answer and the correct answer.
  - Offer a "Play Again" button that restarts the entire game.

### Single-Page Flow

- The app uses GamePage.tsx to hold everything, or you can route from /game to show the quiz content.
- If you expand later, you could have a home page with a "Start" button (but keep it simple if not needed).

## 3. Detailed Steps for Implementation

Below is a step-by-step plan. Each step is described with extra clarity.

### 3.1. Create a Dedicated "Question Generation" Utility

Create a new file: `src/utils/mathQuestionGenerator.ts`

- Export a function: `generateQuestion()` => `{ question, answers, correctIndex }`
- The function randomly picks an operator (+, -, *), chooses random operands, and ensures answers are unique.
- Return an object with:
  - text: string (e.g., "What is 7 + 5?")
  - options: number[] (4 numbers)
  - correctIndex: number (the array index in options that is correct)

Example:

```typescript
export function generateQuestion() {
  const operators = ['+', '-', '*'];
  const op = operators[Math.floor(Math.random() * operators.length)];

  const a = Math.floor(Math.random() * 10) + 1; // 1–10
  const b = Math.floor(Math.random() * 10) + 1;

  let correctAnswer: number;
  switch (op) {
    case '+': correctAnswer = a + b; break;
    case '-': correctAnswer = a - b; break;
    case '*': correctAnswer = a * b; break;
    // More ops if desired
  }

  // Generate 3 distractors, then shuffle
  // ...
}
```

### 3.2. Expand useMathGame Hook

Inside `src/hooks/useMathGame.ts`:

#### State:

- questions: Question[] (array of 10 generated questions)
- currentQuestionIndex: number
- score: number
- isFinished: boolean
- answers: { questionText: string; selected: number; correct: number; isCorrect: boolean }[]

#### initializeGame:

- Generate 10 questions with generateQuestion() and store them.
- Reset other states to default.

#### submitAnswer:

- Compare user's selected index with the correct index.
- If correct, increment score.
- Push an object to answers so summary can show: `answers: [...answers, { questionText, selected, correct, isCorrect }]`.
- Increment currentQuestionIndex.
- If currentQuestionIndex hits 10, set isFinished = true.

#### Play Again:

- Reset state to defaults & generate new questions.

### 3.3. The "QuestionCard" Component

Create a folder: `src/components/QuestionCard/`

- File: QuestionCard.tsx
- CSS: QuestionCard.css

#### Layout Requirements:

- A large question text, e.g. "What is 7 + 5?".
- Four big answer buttons side-by-side or in a 2×2 grid.
- After the user selects an option:
  - Immediately highlight chosen answer:
    - .correct CSS class if right
    - .wrong CSS class if wrong
  - If wrong, also highlight the correct answer with .correct.
  - Temporarily disable all buttons (so user can't re-click).
  - After a small delay, call submitAnswer(selectedIndex) from the useMathGame hook.

#### Implementation Outline:

```tsx
import React, { useState } from 'react';
import './QuestionCard.css';
import { useMathGame } from '../../hooks/useMathGame';

export const QuestionCard: React.FC = () => {
  const { currentQuestion, currentQuestionIndex, submitAnswer } = useMathGame();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!currentQuestion) {
    // Might show a loading spinner or fallback
    return null;
  }

  const handleClick = (optionIndex: number) => {
    setSelectedIndex(optionIndex);
    // Evaluate correct/wrong
    setTimeout(() => {
      submitAnswer(optionIndex);
      setSelectedIndex(null);
    }, 2000); // wait 2s
  };

  return (
    <div className="question-card">
      <h2 className="question-text">
        {`Question ${currentQuestionIndex + 1}/10: ${currentQuestion.text}`}
      </h2>
      <div className="answers-container">
        {currentQuestion.options.map((opt, idx) => {
          let className = "answer-button";
          if (selectedIndex !== null) {
            if (idx === currentQuestion.correctIndex) {
              className += " correct";
            }
            if (idx === selectedIndex && idx !== currentQuestion.correctIndex) {
              className += " wrong";
            }
            if (idx !== selectedIndex && idx !== currentQuestion.correctIndex) {
              className += " disabled";
            }
          }

          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleClick(idx)}
              disabled={selectedIndex !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

#### CSS (QuestionCard.css) can closely mimic geogame. For example:

```css
.question-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
}

/* question text styling */
.question-text {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

/* answer buttons layout */
.answers-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* base styles for buttons */
.answer-button {
  padding: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #1976d2;
  background-color: #1976d2;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s;
}

.answer-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background-color: #1565c0;
}

/* disabled style */
.answer-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* correct style */
.answer-button.correct {
  background-color: #2e7d32;  /* green */
  border-color: #2e7d32;
}

/* wrong style */
.answer-button.wrong {
  background-color: #d32f2f; /* red */
  border-color: #d32f2f;
}
```

### 3.4. The "Summary" Component

Create a folder: `src/components/Summary/`

- File: Summary.tsx
- CSS: Summary.css

#### Requirements:

- Show final score: e.g. Your Score: 7/10.
- List each question, user's answer, correct answer, highlight if correct or not.
- A button to "Play Again".

#### Implementation Outline:

```tsx
import React from 'react';
import { useMathGame } from '../../hooks/useMathGame';
import './Summary.css';

export const Summary: React.FC = () => {
  const { score, answers, restart } = useMathGame();

  return (
    <div className="summary-container">
      <h2 className="summary-title">Game Summary</h2>
      <p className="summary-score">Your Score: {score} / 10</p>
      <div className="answers-list">
        {answers.map((answer, idx) => (
          <div className={`answer-item ${answer.isCorrect ? 'correct' : 'wrong'}`} key={idx}>
            <div className="question-text">{answer.questionText}</div>
            <div className="user-answer">Your answer: {answer.selected}</div>
            {!answer.isCorrect && (
              <div className="correct-answer">Correct answer: {answer.correct}</div>
            )}
          </div>
        ))}
      </div>
      <button className="play-again-button" onClick={restart}>
        Play Again
      </button>
    </div>
  );
};
```

#### CSS (Summary.css) with a pleasing look:

```css
.summary-container {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
}

.summary-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.summary-score {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.answer-item {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
}

.answer-item.correct {
  border-left: 8px solid #2e7d32; /* green bar */
}
.answer-item.wrong {
  border-left: 8px solid #d32f2f; /* red bar */
}

.play-again-button {
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: #1976d2;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.play-again-button:hover {
  transform: translateY(-2px);
  background-color: #1565c0;
}
```

### 3.5. The "App" and "GamePage" Structure

App.tsx could hold a simple router or directly render GamePage.
GamePage.tsx:

```tsx
import React from 'react';
import { useMathGame } from '../hooks/useMathGame';
import { QuestionCard } from '../components/QuestionCard/QuestionCard';
import { Summary } from '../components/Summary/Summary';

export const GamePage: React.FC = () => {
  const { isFinished } = useMathGame();

  return (
    <div>
      {!isFinished && <QuestionCard />}
      {isFinished && <Summary />}
    </div>
  );
};
```

### 3.6. Wrapping with a Provider

Approach: Similar to geogame's context. Alternatively, you can store everything in a single useMathGame hook. For a simpler approach:

Create: `src/hooks/MathGameProvider.tsx`:

```tsx
import React, { createContext, useContext, useState } from 'react';
import { generateQuestion } from '../utils/mathQuestionGenerator';
import { Question } from '../types/Question';

// ... define context types

const MathGameContext = createContext<MathGameContextType | undefined>(undefined);

export const MathGameProvider: React.FC = ({ children }) => {
  // same logic from useMathGame 
  // Then return a context provider
  return (
    <MathGameContext.Provider value={{ ... }}>
      {children}
    </MathGameContext.Provider>
  );
};

export const useMathGame = () => {
  const context = useContext(MathGameContext);
  if (!context) throw new Error("must use within provider");
  return context;
};
```

Wrap: In main.tsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MathGameProvider } from './hooks/MathGameProvider';
import App from './components/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MathGameProvider>
      <App />
    </MathGameProvider>
  </React.StrictMode>
);
```

### 3.7. Testing Approach

#### Unit Tests:
- mathQuestionGenerator.test.ts: ensures question generation is correct (unique distractors, correct operator, etc.).
- useMathGame.test.tsx: tests logic for score, next question, finishing, etc.

#### Component Tests:
- QuestionCard.test.tsx:
  - Renders with a sample question
  - User clicks an answer
  - Checks classes .correct, .wrong
- Summary.test.tsx:
  - Mocks final answers
  - Verifies correct/wrong styling

#### Integration/E2E (Optional with something like Playwright or Cypress):
- Start the game, pick answers, see final summary.

## 4. Styling & UX Enhancements in Detail

### Transitions/Animations:

- Add small scale or rotate animations to the "card" containers for flair, e.g., transform scale on hover.
- The .correct or .wrong classes can fade in with a CSS transition (transition: background-color 0.2s ease;).

### Progress Indicator:

- At top of QuestionCard, display "Question 3/10" in a larger, bolder text with a progress bar or circle.
- Example: a small horizontal progress bar that increments each question.

### Fixed Container Width:

- Use max-width: 800px; margin: 0 auto; to center content.

### Mobile Responsiveness:

- Switch .answers-container from 2×2 grid to single-column (4 rows) if max-width: 480px.

### Summary:

- For each question, show the original text (e.g. "7 + 5 = ?") for clarity, not just the final result.
- Color-coded left border (green or red) to indicate correctness.

## 5. Putting It All Together

### Step-by-Step Summary
1. Add a "mathQuestionGenerator" Utility
   - In src/utils/mathQuestionGenerator.ts
   - Provide random question text and 4 distinct options.

2. Refactor useMathGame
   - Keep quiz state: questions, score, currentQuestionIndex, isFinished, answers[].
   - Implement initGame(), submitAnswer(index), and restart().

3. Build "QuestionCard"
   - Show current question text.
   - Render 4 clickable answer buttons.
   - On click: highlight correct/incorrect visually, then after 2s call submitAnswer().

4. Build "Summary"
   - Show final score out of 10.
   - List all answers with green (correct) or red (incorrect).
   - Button "Play Again" calls restart().

5. Test each piece thoroughly.

6. Enhance the CSS for a more polished look:
   - Card-like layouts, shadow, border radius, hover animations.
   - Vibrant colors for right (green) / wrong (red).
   - Summaries with a nice layout that's consistent across screen sizes.

7. (Optional) If you want a single App.tsx, do something like:

```tsx
export function App() {
  const { isFinished } = useMathGame();

  return (
    <div className="app-container">
      {!isFinished ? <QuestionCard /> : <Summary />}
    </div>
  );
}
```

Add top-level "app-container" styles to center everything nicely.

## 6. Final Notes

By following each step carefully, your Math Game will closely replicate the interactive, visually appealing experience from your Geography Quiz application—without i18n or theme switching, and with emphasis on correct-answer highlighting, a clean summary screen, and an attractive user interface.