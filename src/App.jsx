import { useState } from 'react';
import Header from './components/Header';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import StartScreen from './components/StartScreen';
import { useQuiz } from './providers/QuizProvider';
import { SCREENS } from './constants';

const App = () => {
  const { screen } = useQuiz(); 

  return (
    <div className="page-wrapper">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {screen === SCREENS.START && <StartScreen />}
        {screen===SCREENS.QUIZ && <QuizScreen />}
        {screen===SCREENS.RESULT && <ResultScreen />}
      </main>
    </div>
  );
};

export default App;
