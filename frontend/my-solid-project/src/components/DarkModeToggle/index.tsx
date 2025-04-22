import { createSignal, onMount } from "solid-js";

export default function DarkModeToggle() {
    // Signals
    const [dark, setDark] = createSignal(false);

    onMount(() => {
        const isDark = localStorage.getItem("theme") === "dark";
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    });

    const toggleTheme = () => {
        const next = !dark();
        setDark(next);
        localStorage.setItem("theme", next ? "dark" : "light");
        document.documentElement.classList.toggle("dark", next);
    };

    return (
        <label class="flex items-center cursor-pointer space-x-2">
            <input type="checkbox" checked={dark()} onChange={toggleTheme} />
            <span class="text-lg text-gray-700 dark:text-gray-300">
                {dark() ? "☀ Light" : "🌙 Dark"}
            </span>
        </label>
    );
}
