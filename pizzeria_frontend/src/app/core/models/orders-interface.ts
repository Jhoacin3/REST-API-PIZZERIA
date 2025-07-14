export interface OrdersInterface {
    id_order: number,
    employee: string,
    id_tables: number,
    date: Date,
    total: number, //ojo aqui, creo que viene como string el total
    state: string
}
