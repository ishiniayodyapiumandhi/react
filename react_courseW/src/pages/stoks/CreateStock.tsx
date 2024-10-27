import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import axios from "axios";

function CreateStock() {

    const [items, setItems] = useState<ItemType[]>([]);

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8081/items");
            setItems(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function() {
        loadItems();
    }, [])

    const [stockedItems, setStockedItems] = useState<ItemType[]>([]);
    const [total, setTotal] = useState<number>(0);

    function addItemToStock(item: ItemType) {
        const updatedStock = [...stockedItems, item];
        setStockedItems(updatedStock);
    }

    useEffect(function () {
        stockedItems.map(function (item) {
            const totalPrice = total + item.price;
            setTotal(totalPrice);
        })
    },[stockedItems])

    return  (
      
       <div className="flex">
            <div className="w-[400px] border-r border-slate-100 p-2">
                <span className="text-xl font-semibold text-rose-900 block h-[40px] p-2">Items</span>

               <div className="mt-5">
                {items.map(function (item) {
                    return (
                        <div onClick={() => addItemToStock(item)} className="border border-slate-200 rounded-lg p-2 mb-3">
                            <div className="text-lg font-semibold text-slate-800">{item.name}</div>
                            <div className="text-sm text-slate-400">{item.category?.name}</div>
                            <div className="text-sm text-green-900 text-right">Rs. {item.price}</div>
                        </div>
                    )
                })}
           </div>
         </div>

            <div className="p-2 w-full">
            <span className="text-xl font-semibold text-rose-900">New Stock</span>

            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th className="text-right">Price</th>
                </thead>
                <tbody>
                    {stockedItems.map(function (item) {
                        return (
                            <tr>
                                <td className="w-[80px]">{item.id}</td>
                                <td className="w-[200px]">{item.name}</td>
                                <td className="w-[200px] text-right">{item.price}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan={2}>
                            <strong>Total</strong>
                        </td>
                        <td className="border-t border-slate-900 text-right">
                            <strong>{total}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm">Save Stock</button>
            </div>
            </div>
        </div> 

    )
}

export default CreateStock;