# Sobes Trainer

Interactive web app for practicing frontend job-interview questions on HTML, CSS, JavaScript and React.

## Overview
Quick, no-signup practice rounds: pick a category, answer multiple-choice questions against a countdown timer, and get instant feedback with explanations plus a full breakdown at the end of the round.

## Features
- Category selection (HTML, CSS, JavaScript, React, Mixed)
- Timed rounds with a live countdown and progress bar
- Instant answer feedback — correct/incorrect highlighting plus an explanation for each question
- Result screen with score, category, skill-level message, and a review of missed questions
- Best result persisted locally (localStorage)
- Light / dark / system theme toggle, synced with the OS preference

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4
- React Compiler (babel-plugin-react-compiler)
- ESLint
- Context API for quiz state (QuizProvider)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Available Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Project Structure
- `components/` — UI building blocks (Header, StartScreen, QuizScreen, QuestionCard, AnswerOption, Timer, ProgressBar, ResultScreen, Card, SelectTheme)
- `providers/` — QuizProvider (quiz state and flow)
- `hooks/` — useCountdown
- `data/` — questions and categories
- `utils.js` — shuffle, result-level calculation, localStorage helpers
