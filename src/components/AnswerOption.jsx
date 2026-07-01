const AnswerOption = ({
  option,
  index,
  isSelected,          
  correctAnswer,
  hasSelectedAnswer,  
  onSelect,
  disabled,
}) => {
  const isCorrect = option === correctAnswer;
  const cssClasses = {
    normal: 'border-line bg-white text-ink hover:border-ink dark:border-zinc-800 dark:bg-zinc-950 dark:text-paper dark:hover:border-paper',
    error: 'border-danger bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
    success: 'border-success bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
  };

  let resultClass = cssClasses.normal;

  if (isSelected && isCorrect) resultClass = cssClasses.success;
  if (isSelected && !isCorrect) resultClass = cssClasses.error;
  if (hasSelectedAnswer && !isSelected && isCorrect) resultClass = cssClasses.success;

  return (
    <button
      className={`rounded-lg border px-5 py-4 text-left text-base font-semibold transition-colors ${resultClass}`}
      type="button"
      disabled={disabled}
      onClick={onSelect}
    >
      {option || `Вариант ответа ${index + 1}`}
    </button>
  );
};

export default AnswerOption;
