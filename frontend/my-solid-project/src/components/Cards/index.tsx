import { Component } from "solid-js";

export interface CardData {
    title: string;
    content: string;
}

interface CardsProps {
    cardData: CardData[];
}

const Cards: Component<CardsProps> = (props) => {
    // Props
    const { cardData } = props;

    return (
        <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cardData.map((card) => {
                    return (
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                {card.title}
                            </h2>
                            <div class="text-gray-600 dark:text-gray-300 text-sm">
                                {card.content}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cards;
