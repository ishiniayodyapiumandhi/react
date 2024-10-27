import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {

   const { logout } = useAuth()

   return (
      <div>
      <div className="w-full bg-slate-500 p-2 rounded-lg">
    
    <Link to="/profile" className="bg-gray-800 text-white px-5 py-2 me-3">Profile</Link>

    <Link to="/item" className="bg-gray-800 text-white px-5 py-2 me-3">Item</Link>
    <Link to="/itemCategory" className="bg-gray-800 text-white px-5 py-2 me-3">ItemCategory</Link>
    <Link to="/stock" className="bg-gray-800 text-white px-5 py-2 me-3">Stock</Link>
    <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button> 
    </div>
    <h1 className="container mx-auto text-2xl mb-3">Hello</h1>

    </div>
   )
}

export default Home;