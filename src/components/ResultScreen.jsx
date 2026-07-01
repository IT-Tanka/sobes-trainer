import Card from "./Card";
import { categories } from "../data/categories";
import { useQuiz } from "../providers/QuizProvider";


const ResultScreen = () => {
  const { results, restartQuiz } = useQuiz();
  const categoryLabel = categories.find(cat => cat.value === results?.category)?.label || 'Unknown Category';

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
        <div>
          <span className="badge mb-5">
            {results.finishedByTimeout ? 'Time is over' : 'Round completed'}
          </span>
          <h1 className="text-5xl font-bold leading-[1.15] sm:text-6xl">
            Результат собеседования
          </h1>
        </div>
        {/* Right side */}
        <div className="space-y-4 text-lg text-zinc-600 dark:text-zinc-300">
          <p>Категория:{categoryLabel}</p>
          <p>{results.level}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card title="Correct" value={results.correctCount} />
        <Card title="Errors" value={results.mistakesCount} />
        <Card title="Score" value={`${results.percent}%`} />
      </div>

      {/* Results */}
      <div className="card p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="badge mb-4">Review</span>
            <h2 className="text-3xl font-bold leading-tight">
              Ошибки и пропущенные вопросы
            </h2>
          </div>
        </div>

        <button
          className="ghost-button w-full sm:w-auto"
          type="button"
          onClick={restartQuiz}
        >
          Пройти ещё раз
        </button>

        {results.mistakesCount > 0 ? (
          <div className="grid gap-4">
            {results.mistakes.map((mistake, index) => (
              <article key={index} className="rounded-lg border  border-line p-5 dark:border-zinc-800">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="badge">{mistake.category}</span>
                  <span className=" text-zinc-500 dark: text-zinc-400">
                    Ваш ответ: {' '}
                    {mistake.selectedAnswer || 'Не отвечено'}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-snug">
                  {mistake.question}
                </h3>
                <p className="mt-3 font-semibold text-success">
                  Правильный ответ: {mistake.correctAnswer}
                </p>
                <p className="mt-2 text-zinc-600 dark: text-zinc-300" >
                  Объяснение: {mistake.explanation || 'Нет объяснения'}
                </p >
              </article >))}
          </div >) :
          (<p className="text-zinc-500 dark:text-zinc-400">
            Ошибок нет. Все вопросы были отвечены верно. Отличная работа!
          </p>)}
      </div>

    </section >
  );
};

export default ResultScreen;
