import axios from "axios";
import { useEffect, useState } from "react";
import ItemCategoryType from "../types/ItemCategoryType";
import { useAuth } from "../context/AuthContext";

function ItemCategory() {

    const { isAuthenticated, jwtToken} = useAuth();

    const [itemCategories, setItemCategories] = useState<ItemCategoryType[]>([]);
    const [itemCategoryName, setItemCategoryName] = useState<String>("");

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadItemCategories() {
        const response = await axios.get("http://localhost:8081/item-categories", config);
        setItemCategories(response.data);
    }

    useEffect(function () {
        if(isAuthenticated) {
        loadItemCategories();
       }
    },[isAuthenticated])

    function handleItemCategoryName(event: any) {
        setItemCategoryName(event.target.value);
    }

    async function handleSubmit() {
        const data = {
            name: itemCategoryName
        }
        const response = await axios.post("http://localhost:8081/item-categories", data, config);
        console.log(response);
        loadItemCategories();
    }

    return (
        <div className="container mx-auto pt-5 pb-5">

            <h1 className="text-3xl font-semibold mb-5 text-slate-900">ItemCategories</h1>

            {itemCategories && itemCategories.map(function (itemCategory: ItemCategoryType) {
                return (
                    <div className="text-slate-600 border border-slate-200 rounded-lg mb-3 p-3 shadow-lg inline-block me-3">
                        {itemCategory.name}
                    </div>
                )
            })
            }
            
            <h2 className="text-xl text-slate-900 font-medium mb-4 mt-5">Create ItemCategory</h2>

            <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px]">
              <form>
                <label className="text-slate-600 font-sm block mb-2">ItemCategory Name </label>
                <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg bg-slate-400" onChange={handleItemCategoryName} required/>

                <button type="button" className="py-3 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-700 mb-2 text-sm" onClick={handleSubmit}>Create ItemCategory</button>
              </form>
            </div>
        </div>
    )
}

export default ItemCategory;