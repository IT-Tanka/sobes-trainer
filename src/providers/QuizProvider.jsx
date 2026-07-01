import { createContext, useContext, useState } from "react";
import { categories } from "../data/categories";
import { questions } from "../data/questions";
import { shuffle } from "../utils";
import { ROUND_QUESTIONS_COUNT } from "../constants"; 
import { SCREENS } from "../constants";
import { readStorageValue, writeStorageValue, calculateLevel } from "../utils";

const QuizContext = createContext();

const LAST_RESULT_KEY = 'lastQuizResult';
const BEST_RESULT_KEY = 'bestQuizResult';

export function QuizProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('mixed');
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [results, setResults] = useState(null);
  const [screen, setScreen] = useState(SCREENS.START);
  const [bestResult, setBestResult] = useState(() => readStorageValue(BEST_RESULT_KEY));

  const startQuiz = (activeCategory) => {
    const sourceQuestions = activeCategory === 'mixed' 
      ? questions 
      : questions.filter((q) => q.category === activeCategory);
    
    const shuffledQuestions = shuffle(sourceQuestions);
    const countedQuestions = shuffledQuestions.slice(0, ROUND_QUESTIONS_COUNT);
    
    console.log('Counted questions:', countedQuestions);
    
    setRoundQuestions(countedQuestions);
    setSelectedCategory(activeCategory);
    setResults(null);
    setScreen(SCREENS.QUIZ);
  };

  const finishQuiz = (answerRecords, finishedByTimeout = false) => {
   
    const answersByQuestionId = answerRecords.reduce((answers, record) => {
      return {
        ...answers,
        [record.questionId]: record.selectedAnswer,
      };
    }, {});

    const review = roundQuestions.map((question) => {
      const selectedAnswer = answersByQuestionId[question.id] || null;
      return {
        ...question,
        selectedAnswer,
        isCorrect: selectedAnswer === question.correctAnswer,
      };
    });

    const correctCount = review.filter((item) => item.isCorrect).length;
    const mistakes = review.filter((item) => !item.isCorrect);
    const percent = Math.round((correctCount / roundQuestions.length) * 100);

    const nextResult = {
      id: crypto.randomUUID(),
      category: selectedCategory,
      total: roundQuestions.length,
      correctCount,
      mistakesCount: mistakes.length,
      percent,
      level: calculateLevel(percent),
      mistakes,
      finishedByTimeout,
      completedAt: new Date().toISOString(),
    };

   
    writeStorageValue(LAST_RESULT_KEY, nextResult);

    
    if (!bestResult || nextResult.percent >= bestResult.percent) {
      writeStorageValue(BEST_RESULT_KEY, nextResult);
      setBestResult(nextResult);
    }

    setResults(nextResult); 
    setScreen(SCREENS.RESULT);
  };

  const restartQuiz = () => {
    setRoundQuestions([]);
    setResults(null);
    setScreen(SCREENS.START);
  };

  return (
    <QuizContext.Provider 
      value={{ 
        startQuiz, 
        screen, 
        setScreen, 
        selectedCategory, 
        setSelectedCategory, 
        roundQuestions, 
        setRoundQuestions, 
        results, 
        setResults, 
        finishQuiz, 
        restartQuiz,
        bestResult,
        setBestResult,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

export default QuizProvider;
