import DarkModeToggle from "../DarkModeToggle";

export default function TopBar() {
    return (
        <header class="flex items-center justify-between bg-white dark:bg-gray-800 shadow h-16">
            <div class="flex items-center gap-4">
                <DarkModeToggle />
            </div>
            <div class="flex items-center space-x-3 px-4 cursor-pointer">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="Avatar"
                    class="rounded-full w-8 h-8"
                />
                <span class="text-sm text-gray-800 dark:text-white">
                    John Doe
                </span>
            </div>
        </header>
    );
}
