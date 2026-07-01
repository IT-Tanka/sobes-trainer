const ProgressBar = ({ value }) => {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
      aria-label="Прогресс раунда"
    >
      <div
        className="h-full rounded-full bg-ink transition-all duration-300 dark:bg-paper"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;
