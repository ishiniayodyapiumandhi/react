import ItemType from "./ItemType";

interface StockType {
    id: number,
    quantity: number,
    lastUpdated: Date,
    item: ItemType
}

export default StockType;