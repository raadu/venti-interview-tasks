import TopBar from "../TopBar";
import Sidebar from "../Sidebar";

export default function DashboardLayout(props: { children: any }) {
    return (
        <div class="h-screen flex bg-gray-100 dark:bg-gray-950">
            <Sidebar />
            <div class="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <main class="flex-1 p-6 overflow-auto text-gray-800 dark:text-gray-200">
                    {props.children}
                </main>
            </div>
        </div>
    );
}
