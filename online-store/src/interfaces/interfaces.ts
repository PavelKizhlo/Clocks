export interface View {
    render: () => void;
}

export interface CardBlockView {
    render: (filterData: Filters, searchString: string, sortData: string) => void;
}

export interface CardView {
    render: (data: CardData) => HTMLDivElement;
}

export interface CardData {
    type: string;
    brand: string;
    color: string;
    movement: string;
    price: number;
    amount: number;
    isPopular: boolean;
    src: string;
}

export interface Filters {
    type: string[];
    brand: string[];
    color: string[];
    movement: string;
    price: number[];
    amount: number[];
    popularOnly: boolean;
}
