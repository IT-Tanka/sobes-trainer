import { useState } from 'react';
import { categories } from '../data/categories';
import { ROUND_TIME_SECONDS } from '../constants';
import { useQuiz } from '../providers/QuizProvider';

const ROUND_MINUTES = Math.floor(ROUND_TIME_SECONDS / 60);
const ROUND_SECONDS = ROUND_TIME_SECONDS % 60;
const formatTime = (value) => value.toString().padStart(2, '0');
const ROUND_TIME_LABEL = `${formatTime(ROUND_MINUTES)}:${formatTime(ROUND_SECONDS)}`;

const StartScreen = () => {
    const {
        startQuiz,
        bestResult,
        selectedCategory,
        setSelectedCategory
    } = useQuiz();

    const handleStart = () => {
        startQuiz(selectedCategory);
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
                <div>
                    <span className="badge mb-5">FRONTEND ПРАКТИКА</span>

                    <h1 className="max-w-3xl text-5xl lg:text-6xl font-bold leading-[1.15] tracking-normal mb-8">
                        Тренажер Frontend<br />Собеседований
                    </h1>
                </div>
                <div className="space-y-5 text-lg text-zinc-400">
                    <p>5–8 вопросов / {ROUND_TIME_LABEL}</p>
                    <p>
                        Быстрый учебный раунд без регистрации. Выберите тему,<br />
                        ответьте на вопросы и разберите ошибки сразу после завершения.
                    </p>
                </div>

            </div>

            <div className="space-y-6">
                {/* Categories + Info */}
                <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                    <div className="card p-6 sm:p-8">
                        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`category-tab px-2 py-3 text-base font-medium  transition-all 
                                        ${selectedCategory === cat.value
                                            ? 'category-tab-active'
                                            : ''
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Info Cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border border-line bg-soft p-5 dark:border-zinc-800 dark:bg-zinc-900">
                                <span className="badge mb-4">Раунд</span>
                                <p className="text-3xl font-bold leading-tight">8 вопросов</p>
                                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                    Только один вариант ответа в каждом вопросе.
                                </p>
                            </div>

                            <div className="rounded-lg border border-line bg-soft p-5 dark:border-zinc-800 dark:bg-zinc-900">
                                <span className="badge mb-4">Timer</span>
                                <p className="text-3xl font-bold leading-tight">{ROUND_TIME_LABEL}</p>
                                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                    Таймер стартует после нажатия кнопки.
                                </p>
                            </div>
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={handleStart}
                            className="primary-button w-full sm:w-auto mt-6"
                        >
                            Начать собеседование
                        </button>
                    </div>

                    {/* Best Result  */}
                    <aside className="card p-6">
                        <span className="badge mb-5">Лучший результат</span>
                        {bestResult ? (
                            <div className="space-y-4">
                                <p className="text-5xl font-bold leading-none">
                                    {bestResult.percent}%
                                </p>
                                <p className="text-zinc-600 dark:text-zinc-300">
                                    {bestResult.correctCount} из {bestResult.total} правильных
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400">
                                    Категория: {bestResult.category}. Уровень: {bestResult.level}.
                                </p>
                            </div>
                        ) : (
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Первый результат будет доступен после прохождения раунда.
                            </p>
                        )}
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default StartScreen;
