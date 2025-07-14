export interface ApiResponseInterface {
    data: {
        total: string;
        orderIdSelected: number;
        result: OrderDetailsInterface[];
    };
}

export interface OrderDetailsInterface {
    messages: string;
    employees_id: number;
    id_order_details: number;
    type: string
    name: string;
    id_menu: number;
    amount: number;
    unit_price: number;
    description: string;
    total: string;
}
