import type { Component } from "solid-js";
import DashboardLayout from "./components/DashboardLayout";

const App: Component = () => {
    return (
        <DashboardLayout>
            <h1 class="text-2xl font-bold">Welcome to the Dashboard</h1>
        </DashboardLayout>
    );
};

export default App;
