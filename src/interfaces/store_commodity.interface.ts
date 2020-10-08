export interface IStoreCommodity {
    store_commodity_id?: Number;
    commodity_id: Number;
    store_id: Number;
    stock_min: Number;
    stock_max: Number;
    current_stock;
    last_update: String;
    state: Number;
}