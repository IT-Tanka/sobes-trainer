import { useState, useEffect } from "react";

const THEME_KEY = 'sobes-trainer:theme';
function getInitialThemeMode() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        return savedTheme;
    }
    return 'system';
}
function getSystemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const SelectTheme = () => {
    const [themeMode, setThemeMode] = useState(getInitialThemeMode());
    const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark());

    useEffect(() => {
        setSystemPrefersDark(getSystemPrefersDark());
    }, []);
    // theme change listener for themeMode changes
    useEffect(() => {
        const shouldUseDarkTheme = themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);
        document.documentElement.classList.toggle('dark', shouldUseDarkTheme);
        localStorage.setItem(THEME_KEY, themeMode);
    }, [themeMode, systemPrefersDark]);
    // theme change listener for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event) => {
            setSystemPrefersDark(event.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);
    return (
        <select value={themeMode} onChange={(e) => setThemeMode(e.target.value)} className="rounded-full border border-line bg-transparent px-4 py-2 text-base font-medium outline-none
                     transition-colors hover: border-link dark: border-zinc-700 dark: hover:border-paper">
            <option value="system">Системная</option>
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
        </select>
    );
}

export default SelectTheme;
