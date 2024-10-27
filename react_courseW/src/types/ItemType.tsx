import ItemCategoryType from "./ItemCategoryType";

interface ItemType {

    id: number;
    name: string;
    price: number;
    category: ItemCategoryType;

}

export default ItemType;