export interface View {
    render: () => void;
}

export interface Filters {
    type: string[];
    brand: string[];
    color: string[];
    movement?: string;
    price: number[];
    amount: number[];
    isPopular: boolean;
}
