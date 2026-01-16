import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import DashBoard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
