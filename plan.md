Below is a highly detailed step-by-step plan for creating a simple, interactive math game using TypeScript, React, Material UI, Vite, and React Testing Library. The plan also covers GitHub Pages deployment. The objective is to ensure no steps are left out so that even a less-intelligent agent (like “Claude Sonnet 3.7”) could execute it successfully.

1. Project Initialization
1.1 Create a new Vite + React + TypeScript project
Install Vite (if not already installed)

bash
Copy
Edit
npm create vite@latest
Follow the interactive prompts

Project name: math-game
Select Framework: React
Select Variant: React + TypeScript
Navigate into the newly created folder

bash
Copy
Edit
cd math-game
Install dependencies

bash
Copy
Edit
npm install
Run the development server

bash
Copy
Edit
npm run dev
Confirm that the Vite development server starts and you can reach the default page at the indicated local URL (often http://localhost:5173/).
1.2 Install additional dependencies
Material UI (MUI)

bash
Copy
Edit
npm install @mui/material @emotion/react @emotion/styled
React Testing Library + Jest DOM

bash
Copy
Edit
npm install --save-dev @testing-library/react @testing-library/jest-dom
Some templates may come with vitest or jest pre-configured, but if not, we’ll set up a test script.
(Optional) Material UI Icons if you plan to use MUI icons

bash
Copy
Edit
npm install @mui/icons-material
2. Project Structure
Below is a recommended file/folder structure:

css
Copy
Edit
math-game/
├─ src/
│  ├─ components/
│  │  ├─ App.tsx
│  │  ├─ QuestionCard.tsx
│  │  ├─ Summary.tsx
│  │  └─ index.ts  (optional barrel file for components)
│  ├─ pages/
│  │  └─ GamePage.tsx
│  ├─ hooks/
│  │  └─ useMathGame.ts  (custom hook to manage questions)
│  ├─ tests/
│  │  ├─ App.test.tsx
│  │  └─ GamePage.test.tsx
│  ├─ main.tsx
│  ├─ vite-env.d.ts
│  └─ ...
├─ public/
│  └─ ...
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ ...
Explanation:

components/: Reusable UI components (e.g. QuestionCard, Summary).
pages/: Full-screen or page-level components (e.g. GamePage).
hooks/: Custom React hooks (e.g. useMathGame).
tests/: Keeps test files organized.
3. Core Logic: Generating and Managing Questions
3.1 Decide on question parameters
Number of questions per game: 10 (hardcoded for now, but can be turned into a parameter).
Range of numbers: 0 to 100 for each operand.
3.2 Generating random addition questions
Generate two random numbers from 0 to 100.

ts
Copy
Edit
const randomNumber = (max: number) => Math.floor(Math.random() * (max + 1));
Create an array of questions each containing:

Two operands: num1 and num2
Correct answer: correctAnswer = num1 + num2
Distractor answers: generate 3 incorrect answers.
A structure might look like this:
ts
Copy
Edit
interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[]; // 4 total answers (1 correct + 3 incorrect)
}
Ensure the 3 incorrect answers are distinct from each other and from the correct answer. For a quick approach:

ts
Copy
Edit
function generateQuestion(max: number): Question {
  const num1 = randomNumber(max);
  const num2 = randomNumber(max);
  const correctAnswer = num1 + num2;
  
  // generate 3 distinct distractors
  const distractors: Set<number> = new Set();
  while (distractors.size < 3) {
    const candidate = randomNumber(max * 2); // sum can be up to 2*max
    if (candidate !== correctAnswer) {
      distractors.add(candidate);
    }
  }
  
  // merge correct answer and distractors, then shuffle
  const options = [...distractors, correctAnswer].sort(() => Math.random() - 0.5);
  
  return {
    num1,
    num2,
    correctAnswer,
    options
  };
}
Generate a list of 10 questions in a custom hook or utility function:

ts
Copy
Edit
function generateQuestions(count: number, max: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(max));
  }
  return questions;
}
4. Implementing the Custom Hook useMathGame
This hook will:

Initialize questions when the component mounts.
Track current question index and user’s selected answers.
Handle user submission of each question.
Provide a method to restart the game.
src/hooks/useMathGame.ts:

ts
Copy
Edit
import { useState } from 'react';

interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[];
}

export function useMathGame(questionCount: number, maxRange: number) {
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(questionCount, maxRange));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function handleAnswerSelect(selected: number) {
    if (selected === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questionCount) {
      setCurrentIndex(nextIndex);
    } else {
      setIsGameOver(true);
    }
  }

  function restartGame() {
    setQuestions(generateQuestions(questionCount, maxRange));
    setCurrentIndex(0);
    setScore(0);
    setIsGameOver(false);
  }

  return {
    questions,
    currentIndex,
    score,
    isGameOver,
    handleAnswerSelect,
    restartGame
  };
}

// (Same randomNumber, generateQuestion, generateQuestions helpers can be placed here or imported)
function randomNumber(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function generateQuestion(max: number): Question {
  const num1 = randomNumber(max);
  const num2 = randomNumber(max);
  const correctAnswer = num1 + num2;

  const distractors: Set<number> = new Set();
  while (distractors.size < 3) {
    const candidate = randomNumber(max * 2);
    if (candidate !== correctAnswer) {
      distractors.add(candidate);
    }
  }

  const options = [...distractors, correctAnswer].sort(() => Math.random() - 0.5);

  return { num1, num2, correctAnswer, options };
}

function generateQuestions(count: number, max: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(max));
  }
  return questions;
}
5. Building the Main Game Components
5.1 App.tsx
This is your root component. It can be minimal; it typically just renders GamePage or sets up any global theme:

tsx
Copy
Edit
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GamePage from '../pages/GamePage';

const theme = createTheme({
  // You can customize theme palette, typography, etc.
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GamePage />
    </ThemeProvider>
  );
};

export default App;
5.2 GamePage.tsx
This page ties together the custom hook and the UI.

tsx
Copy
Edit
import React from 'react';
import { useMathGame } from '../hooks/useMathGame';
import QuestionCard from '../components/QuestionCard';
import Summary from '../components/Summary';
import { Container, Typography, Button } from '@mui/material';

const QUESTION_COUNT = 10;
const MAX_RANGE = 100;

const GamePage: React.FC = () => {
  const {
    questions,
    currentIndex,
    score,
    isGameOver,
    handleAnswerSelect,
    restartGame
  } = useMathGame(QUESTION_COUNT, MAX_RANGE);

  if (isGameOver) {
    return (
      <Container>
        <Summary
          score={score}
          questionCount={QUESTION_COUNT}
          onPlayAgain={restartGame}
        />
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Math Game
      </Typography>
      <Typography variant="subtitle1">
        Question {currentIndex + 1} of {QUESTION_COUNT}
      </Typography>
      <QuestionCard
        question={currentQuestion}
        onAnswerSelect={handleAnswerSelect}
      />
    </Container>
  );
};

export default GamePage;
5.3 QuestionCard.tsx
Displays the current question and possible answers (a, b, c, d).

tsx
Copy
Edit
import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[];
}

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (selected: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswerSelect }) => {
  const { num1, num2, options } = question;

  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography variant="h5">
          {num1} + {num2} = ?
        </Typography>
        <Stack spacing={2} marginTop={2}>
          {options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => onAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
5.4 Summary.tsx
Displays the final score and a button to play again.

tsx
Copy
Edit
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface SummaryProps {
  score: number;
  questionCount: number;
  onPlayAgain: () => void;
}

const Summary: React.FC<SummaryProps> = ({ score, questionCount, onPlayAgain }) => {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Game Over!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your score: {score} / {questionCount}
      </Typography>
      <Button variant="contained" onClick={onPlayAgain}>
        Play Again
      </Button>
    </Box>
  );
};

export default Summary;
6. Main Entry Point
src/main.tsx will bootstrap the React app inside root (or similar) HTML element:

tsx
Copy
Edit
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'  // optional global styling

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
7. Testing with React Testing Library
Configuration

In your package.json, add a script:
json
Copy
Edit
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
If you prefer jest, you can configure that, but many Vite projects default to Vitest. The usage with React Testing Library is quite similar to Jest.
Setup file (if needed)

Create a file like setupTests.ts in src/tests/ with:
ts
Copy
Edit
import '@testing-library/jest-dom';
Then, reference it in vitest.config.ts or jest.config.js as needed:
ts
Copy
Edit
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts'
  }
});
Example test (App.test.tsx):

ts
Copy
Edit
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders Math Game heading', () => {
  render(<App />);
  const heading = screen.getByText(/Math Game/i);
  expect(heading).toBeInTheDocument();
});
Another test (GamePage.test.tsx):

ts
Copy
Edit
import React from 'react';
import { render, screen } from '@testing-library/react';
import GamePage from '../pages/GamePage';

test('should display Question 1 of 10', () => {
  render(<GamePage />);
  expect(screen.getByText(/Question 1 of 10/i)).toBeInTheDocument();
});
Running the tests

bash
Copy
Edit
npm run test
8. GitHub Pages Deployment
Install gh-pages:

bash
Copy
Edit
npm install --save-dev gh-pages
Update vite.config.ts:

Add a base property with the repository name if you are deploying to <username>.github.io/<repo-name>/.
ts
Copy
Edit
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/math-game/', // Replace with your REPO name if using <username>.github.io/<repo> 
  plugins: [react()]
});
If using <username>.github.io as the entire repo, you may omit base.
Add homepage field to package.json if you want. Some setups rely on it:

json
Copy
Edit
{
  "name": "math-game",
  "version": "1.0.0",
  "homepage": "https://<your-username>.github.io/math-game", 
  ...
}
Add deploy scripts in package.json:

json
Copy
Edit
{
  "scripts": {
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
Explanation:

predeploy script automatically runs before deploy.
deploy uses gh-pages to publish the dist folder to GitHub Pages.
Create a GitHub repo named math-game and push your code:

bash
Copy
Edit
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/math-game.git
git push -u origin main
Deploy:

bash
Copy
Edit
npm run deploy
This will create a gh-pages branch in your repo and deploy it.
Configure GitHub Pages

Go to your repo settings on GitHub.
In the “Pages” section, select the branch gh-pages as the source if not done automatically.
Wait a few minutes. Your site should be visible at https://<your-username>.github.io/math-game/.
9. Customization & Maintenance
Easily change question range:

In GamePage.tsx, change MAX_RANGE from 100 to another number.
Or introduce a form where the user can choose the range.
More question types:

You can expand beyond addition to subtraction, multiplication, etc.
Modify question generation logic accordingly.
Styling:

Leverage MUI’s theming system for a more polished UI.
Adjust spacing, typography, colors, etc.
Accessibility:

Make sure the buttons and heading elements have appropriate aria labels if needed.
Use semantic HTML elements to ensure screen-reader compatibility.
Production optimizations:

Vite’s build is already optimized.
For performance, consider code splitting if you expand the app significantly.
10. Summary
Following the above steps carefully will result in:

A fully working React + TypeScript math game scaffolded by Vite.
A standard Material UI design: question shown, multiple-choice answers, 10 total questions, a final summary page with score and a button to replay.
Basic coverage tests using React Testing Library.
Deployable to GitHub Pages with minimal effort.
This outline should give Claude Sonnet 3.7 all the explicit details it needs to produce an end-to-end solution with no missing steps.