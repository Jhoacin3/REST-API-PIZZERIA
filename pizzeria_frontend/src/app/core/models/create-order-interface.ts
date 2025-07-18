export interface CreateOrderInterface {
    id_menu: number,
    name: string;
    unit_price: number,
    id_category: number;
    amount: number;
    type: string;
    description: string
}
export interface GetInsumoByOrder {
    id_order_details: number | null;
    id_menu: number,
    name: string;
    unit_price: number,
    id_category: number;
    amount: number;
    type: string;
    description: string
}
