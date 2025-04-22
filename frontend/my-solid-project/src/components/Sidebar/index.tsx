import { createSignal } from "solid-js";
import {
    AiFillCaretLeft,
    AiFillCaretRight,
    AiTwotoneDashboard,
} from "solid-icons/ai";

export default function Sidebar() {
    // Signals
    const [collapsed, setCollapsed] = createSignal(false);

    return (
        <aside
            class={`transition-all duration-300 bg-white dark:bg-gray-900 shadow h-full ${
                collapsed() ? "w-10" : "w-40"
            }`}
        >
            <div class="flex justify-between bg-gray-100 dark:bg-gray-800">
                <div class="h-16 p-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {!collapsed() ? (
                        "Menu"
                    ) : (
                        <AiFillCaretRight
                            class="mt-2 cursor-pointer"
                            onClick={() => setCollapsed(!collapsed())}
                        />
                    )}
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed())}
                    class="text-gray-600 dark:text-gray-300 cursor-pointer p-4"
                >
                    {!collapsed() && <AiFillCaretLeft />}
                </button>
            </div>
            <nav class="p-4 flex justify-center">
                <ul>
                    <li>
                        <a
                            href="#"
                            class="block rounded text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setCollapsed(!collapsed())}
                        >
                            {collapsed() ? <AiTwotoneDashboard /> : "Dashboard"}
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
