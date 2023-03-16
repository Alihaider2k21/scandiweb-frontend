import Home from "./Pages/home";
import AddProduct from "./Pages/addProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/nav" element={<Navbar />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
