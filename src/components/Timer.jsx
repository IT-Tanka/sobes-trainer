const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
};

const Timer = ({ seconds }) => {
  const isAlmostOver = seconds <= 60;

  return (
    <div
      className={`rounded-full w-fit self-end  border px-5 py-2.5 text-xl font-bold leading-none ${
        isAlmostOver
          ? 'border-danger text-danger'
          : 'border-line text-ink dark:border-zinc-700 dark:text-paper'
      }`}
      aria-live="polite"
    >
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;
