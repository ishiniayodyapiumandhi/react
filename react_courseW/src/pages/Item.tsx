import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import axios from "axios";
import ItemCategoryType from "../types/ItemCategoryType";
import { useAuth } from "../context/AuthContext";

function Item() {

    const {isAuthenticated, jwtToken} = useAuth();

    const [items, setItems] = useState<ItemType[]>([]);

    const [itemName, setItemName] = useState<string>("");
    const [price, setPrice] = useState<number>(0.0);
    const [categoryId, setCategoryId] = useState<number>();

    const [itemCategories, setItemCategories] = useState<ItemCategoryType[]>([]);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadItems() {
        const response = await axios.get("http://localhost:8081/items", config);
        setItems(response.data);
    }

    async function loadItemCategories() {
        const response = await axios.get("http://localhost:8081/item-categories", config);
        setItemCategories(response.data);
    }

    useEffect(function() {

        if(isAuthenticated) {
        loadItems();
        loadItemCategories();
       }
    },[isAuthenticated])

    function handleItemName(event: any) {
        setItemName(event.target.value);
    }

    function handlePrice(event: any) {
        setPrice(event.target.value);
    }

    function handleCategoryId(event: any) {
        setCategoryId(event.target.value);
    }

    async function handleSubmit() {
        const data = {
            name: itemName,
            price: price,
            category_id: categoryId
        }

        try {
            await axios.post("http://localhost:8081/items", data);
            loadItems();
            setItemName("");
            setPrice(0);
            setCategoryId(0);
        } catch (error: any) {
            console.log(error);
        }
    }

    const [itemEditing, setItemEditing] = useState<ItemType | null>(null);

    function editItem(item: ItemType) {
        setItemEditing(item);
        setItemName(item.name);
        setPrice(item.price);
        setCategoryId(item.category?.id ?? 0);
    }

    async function updateItem() {
        const data = {
            name: itemName,
            price: price,
            category_id: categoryId
        }

        try {
            await axios.put(`http://localhost:8081/items/${itemEditing?.id}`, data);
            setItemEditing(null);

            loadItems();

            setItemName("");
            setPrice(0);
            setCategoryId(0);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteItem(id: number) {
        try {
            await axios.delete(`http://localhost:8081/items/${id}`);
            loadItems();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold">Items</h1>

            <table className="table min-w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Item_ID</th>
                        <th className="w-[200px]">Item_Name</th>
                        <th className="w-[200px]">Item_Price</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {items.map(function (item) {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                            <button onClick={() => editItem(item)} className="bg-sky-700 text-sky-600 px-2 py-1 rounded-lg hover:bg-sky-900">Edit</button>

                            <button onClick={() => deleteItem(item.id)} className="bg-red-600 text-white rounded-lg px-2 py-1 hover:bg-red-800">Delete</button>
                        </td>
                    </tr>
                )
            })}
                </tbody>

            </table>

            <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item_Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg bg-slate-400" value={itemName} onChange={handleItemName} required/>

                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item_Price</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg bg-slate-400" value={price} onChange={handlePrice} required/>

                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item_Category</label>
                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg bg-slate-400" value={categoryId} onChange={handleCategoryId} required>
                            <option value="">Please Select Item_Category</option>
                            {itemCategories.map(function (itemCategory) {
                                return (
                                    <option value={itemCategory.id}>{itemCategory.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    
                    {itemEditing ? (
                        <>
                          <button type="button" className="py-3 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-700 mb-2 text-sm" onClick={updateItem}>Update Item</button>
                        </>
                    ) : (
                         <>
                           <button type="button" className="py-3 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-700 mb-2 text-sm" onClick={handleSubmit}>Create Item</button>
                         </>
                    )}
                    
                </form>
            </div>

           
        </div>
    )
}

export default Item;