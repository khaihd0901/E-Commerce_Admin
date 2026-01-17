import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import DashBoard from "./pages/Dashboards/Dashboards";
import Products from "./pages/Products/Products";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import Categories from './pages/Categories/Categories'
import Brands from './pages/Brands/Brands'
import Coupons from './pages/Coupons/Coupons'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="admin" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="orders" element={<Orders />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
