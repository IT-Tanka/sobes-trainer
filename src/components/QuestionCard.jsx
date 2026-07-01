import AnswerOption from "./AnswerOption";

const QuestionCard = ({ 
  question, questionNumber,
  selectedAnswer, 
  onSelectAnswer, hasSelectedAnswer
}) => {
  return (
    <article className="card p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="badge">{question?.category}</span>
        <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
          Вопрос {questionNumber}
        </span>
      </div>

      <h3 className="text-2xl font-bold leading-[1.2]">
        {question?.question}
      </h3>

      {/* Answer Options */}
      <div className="mt-8 grid gap-3">
        {question?.options?.map((option, index) => (
          <AnswerOption 
            key={index}
            option={option}
            index={index}
            onSelect={() => onSelectAnswer(option)}
            isSelected={selectedAnswer === option}
            correctAnswer={question?.correctAnswer}
            hasSelectedAnswer={!!selectedAnswer}  
          />
        ))}
      </div>

      {/* Explanation */}
      {hasSelectedAnswer && (
        <div className="mt-6 rounded-lg border border-line bg-soft p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-semibold">Объяснение</p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            {question?.explanation || "Текст объяснения..."}
          </p>
        </div>
      )}
    </article>
  );
};

export default QuestionCard;
