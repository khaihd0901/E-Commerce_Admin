import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashBoard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
