export interface IStockHistory {
    stock_history_id?: Number;
    store_commodity_id: Number;
    user_id: Number;
    quantity_stock_max: Number;
    quantity_stock_min: Number;
    quantity_current_stock: Number;
    date: String;
}