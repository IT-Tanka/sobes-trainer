import QuestionCard from './QuestionCard';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import { useQuiz } from '../providers/QuizProvider';
import { useState, useEffect} from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { ROUND_TIME_SECONDS } from '../constants';

const QuizScreen = () => {
  const { roundQuestions, finishQuiz } = useQuiz();
  console.log('Round questions in QuizScreen:', roundQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = roundQuestions[currentIndex];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerRecords, setAnswerRecords] = useState([]);
  const isLastQuestion = currentIndex === roundQuestions.length - 1;
  const { timeLeft, isExpired } = useCountdown(ROUND_TIME_SECONDS);

  useEffect(() => {
    if (!isExpired) {
      return;
    }
    const records = selectedAnswer ? [...answerRecords, { questionId: currentQuestion.id, selectedAnswer }] : answerRecords;
    finishQuiz(records, true);
  }, [isExpired, answerRecords, selectedAnswer, currentQuestion, finishQuiz]);

  const progressPercent = Math.floor((currentIndex + Number(Boolean(selectedAnswer))) / roundQuestions.length * 100);

  const handleSelectAnswer = (answer) => {
    if (!selectedAnswer)
      setSelectedAnswer(answer);

  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const allRecords = [...answerRecords, { questionId: currentQuestion.id, selectedAnswer }];
      finishQuiz(allRecords, false);
      return;
    }
    setAnswerRecords((prev) => [...prev, { questionId: currentQuestion.id, selectedAnswer }]);
    setSelectedAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="">
          <span className="badge mb-3">Вопрос {currentIndex + 1}/{roundQuestions.length}</span>
          <h2 className="text-3xl font-bold leading-tight">Раунд собеседования</h2>
        </div>
        <Timer seconds={timeLeft} />
      </div>

      <ProgressBar value={progressPercent} />

      <QuestionCard
        question={currentQuestion}
        currentNumber={currentIndex + 1}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={selectedAnswer}

      />

      <div className="flex justify-end mt-8">
        <button className="primary-button w-full sm:w-auto" disabled={!selectedAnswer} onClick={handleNextQuestion}>
          {isLastQuestion ? 'Показать результаты' : 'Следующий вопрос'}
        </button>
      </div>
    </section>
  );
};

export default QuizScreen;
