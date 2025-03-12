# Math Game

A beautiful, interactive math addition game built with React, TypeScript, and Material UI.

![Math Game Screenshot](https://via.placeholder.com/800x450.png?text=Math+Game+Screenshot)

## Features

- 10 random addition questions per game
- Beautiful, responsive UI with Material UI components
- Score tracking and progress bar
- End-of-game summary with percentage score and feedback
- Fully tested with React Testing Library

## Live Demo

Check out the live demo: [Math Game](https://slawekradzyminski.github.io/mathgame/)

## Technologies Used

- React 19
- TypeScript
- Material UI 6
- Vite
- React Testing Library
- Vitest

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/slawekradzyminski/mathgame.git
   cd mathgame
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Running Tests

Run the tests with:

```bash
npm test
```

## Building for Production

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The app is configured for GitHub Pages deployment. To deploy:

```bash
npm run deploy
```

## Project Structure

```
mathgame/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── tests/          # Test files
│   ├── types/          # TypeScript type definitions
│   ├── main.tsx        # Entry point
│   └── ...
├── public/             # Static assets
└── ...
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built as part of a coding exercise
- Inspired by educational math games
