import type { Component } from "solid-js";
import DashboardLayout from "./components/DashboardLayout";
import Cards from "./components/Cards";
import DataTable from "./components/DataTable";
import { dummyUsers } from "./utils/dummyData";

const cardData = [
    {
        title: "Sales Overview",
        content: "This is a placeholder for a chart or summary text.",
    },
    {
        title: "User Activity",
        content: "Chart goes here or maybe some stats.",
    },
    {
        title: "Performance",
        content: "Performance metrics or chart UI.",
    },
];

const App: Component = () => {
    return (
        <DashboardLayout>
            <Cards cardData={cardData} />
            <div class="min-h-screen p-4">
                <DataTable data={dummyUsers} />
            </div>
        </DashboardLayout>
    );
};

export default App;
