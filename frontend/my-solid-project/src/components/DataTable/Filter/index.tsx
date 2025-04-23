import { Component } from "solid-js";

const Filter: Component<{
    value: string;
    onChange: (value: string) => void;
}> = (props) => {
    return (
        <div class="mb-4">
            <input
                type="text"
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)}
                placeholder="Search..."
                class="px-4 py-2 border border-gray-300 rounded w-full"
            />
        </div>
    );
};

export default Filter;
