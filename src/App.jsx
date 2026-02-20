import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./features/dashboard/Dashboard";
import Products from './features/products/Products'
import OrdersList from "./features/orders/OrdersList";
import ProductStock from './features/stock/ProductStock'
import { Routes, Route } from "react-router-dom";
import Favorites from "./features/products/Favorites";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/inbox" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/stock" element={<ProductStock />} />
        <Route path="/pricing" element={<Dashboard />} />
        <Route path="/calender" element={<Dashboard />} />
        <Route path="/todo" element={<Dashboard />} />
        <Route path="/contacts" element={<Dashboard />} />
        <Route path="/invoices" element={<Dashboard />} />
        <Route path="/team" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
