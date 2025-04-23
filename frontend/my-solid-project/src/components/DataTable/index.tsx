// src/components/DataTable.tsx
import { Component, createSignal, createMemo, For, Show } from "solid-js";
import {
    createSolidTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/solid-table";
import { transformStyle, useDragDropContext } from "@thisbeyond/solid-dnd";
import {
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    SortableProvider,
    createSortable,
    closestCenter,
} from "@thisbeyond/solid-dnd";
import Pagination from "./Pagination";
import Filter from "./Filter";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface DataTableProps {
    data: User[];
}

const SortableRow = (props) => {
    const { id, item } = props;
    const sortable = createSortable(id);
    const [sortableState] = useDragDropContext();

    console.log("id", id);

    return (
        <tr
            use:sortable
            class="sortable bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-move"
            style={transformStyle(sortable.transform)}
        >
            <For each={item.getVisibleCells()}>
                {(cell) => (
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </td>
                )}
            </For>
        </tr>
    );
};

const DataTable: Component<DataTableProps> = (props) => {
    // States, save props.data to a signal
    const [userData, setData] = createSignal<User[]>(props.data);
    console.log("data", userData());

    const [columns, setColumns] = createSignal([
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
    ]);

    const [globalFilter, setGlobalFilter] = createSignal("");

    const [activeItem, setActiveItem] = createSignal(null);

    const userIds = () => {
        return props.data.map((user) => user.id);
    };

    const table = createSolidTable({
        get data() {
            return userData();
        },
        get columns() {
            return columns();
        },
        state: {
            get globalFilter() {
                return globalFilter();
            },
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const onDragStart = ({ draggable }) => {
        console.log("Drag started", draggable.id);
        setActiveItem(draggable.id);
    };

    const onDragEnd = ({ draggable, droppable }) => {
        // Ensure both draggable and droppable are valid
        if (!draggable || !droppable) return;

        const draggedId = draggable.id;
        const droppedId = droppable.id;

        if (draggedId === droppedId) return;

        setData((prevData) => {
            const newData = [...prevData];
            console.log("newData", newData);

            const fromIndex = newData.findIndex(
                (item) => item.id === draggedId
            );
            const toIndex = newData.findIndex((item) => item.id === droppedId);

            if (fromIndex === -1 || toIndex === -1) return prevData;

            const [movedItem] = newData.splice(fromIndex, 1);
            newData.splice(toIndex, 0, movedItem);

            return newData;
        });

        setActiveItem(null);
    };

    return (
        <div class="p-4">
            <Filter value={globalFilter()} onChange={setGlobalFilter} />
            <DragDropProvider
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                collisionDetector={closestCenter}
            >
                <table class="min-w-full divide-y divide-gray-600">
                    <thead class="bg-white dark:bg-gray-800">
                        <tr>
                            <For each={columns()}>
                                {(column) => {
                                    return (
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-move">
                                            {column.header}
                                        </th>
                                    );
                                }}
                            </For>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <DragDropSensors />
                        <SortableProvider ids={userIds()}>
                            <For each={table.getRowModel().rows}>
                                {(row) => {
                                    return (
                                        <SortableRow
                                            id={row.original.id}
                                            item={row}
                                        />
                                    );
                                }}
                            </For>
                        </SortableProvider>
                        <DragOverlay>
                            <Show when={activeItem()}>
                                <div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-6 py-4 shadow-md rounded-md w-full">
                                    <div class="flex justify-between text-sm text-gray-800 dark:text-gray-200">
                                        <span>
                                            {
                                                userData().find(
                                                    (user) =>
                                                        user.id === activeItem()
                                                )?.name
                                            }
                                        </span>
                                        <span>
                                            {
                                                userData().find(
                                                    (user) =>
                                                        user.id === activeItem()
                                                )?.email
                                            }
                                        </span>
                                    </div>
                                </div>
                            </Show>
                        </DragOverlay>
                    </tbody>
                </table>
            </DragDropProvider>
            <Pagination table={table} />
        </div>
    );
};

export default DataTable;
