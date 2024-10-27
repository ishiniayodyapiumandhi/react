
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ItemCategory from './pages/ItemCategory'
import Item from './pages/Item'
import Stock from './pages/stoks/Stock'
import CreateStock from './pages/stoks/CreateStock'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/itemCategory" element={<ItemCategory />} />
        <Route path="/item" element={<Item />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/create" element={<CreateStock />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
