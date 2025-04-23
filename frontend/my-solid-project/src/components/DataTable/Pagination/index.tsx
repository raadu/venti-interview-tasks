import { Component } from "solid-js";

const Pagination: Component<{ table: any }> = (props) => {
    return (
        <div class="flex items-center justify-between mt-4">
            <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={() => props.table.previousPage()}
                disabled={!props.table.getCanPreviousPage()}
            >
                Previous
            </button>
            <span class="text-sm text-gray-700">
                Page {props.table.getState().pagination.pageIndex + 1} of{" "}
                {props.table.getPageCount()}
            </span>
            <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={() => props.table.nextPage()}
                disabled={!props.table.getCanNextPage()}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
