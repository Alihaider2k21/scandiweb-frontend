import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const localProducts = localStorage.getItem("products");
    setProducts(localProducts);
    if (!localProducts) {
      const endpoint =
        "https://alihaiderscandiweb.000webhostapp.com/products/get";
      const response = await axios.get(endpoint, {
        headers: { "Content-Type": "application/json" },
      });
      setProducts(response.data);
    }
  };

  const [checkedProducts, setCheckedProducts] = useState([]);

  const handleCheckBox = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckedProducts([...checkedProducts, value]);
    } else {
      setCheckedProducts(
        checkedProducts.filter((product) => product !== value)
      );
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProduct = async () => {
    const formData = new FormData();
    checkedProducts.map((product, index) => formData.append(index, product));
    const response = await axios.post(
      "https://alihaiderscandiweb.000webhostapp.com/products/delete",
      formData
    );
    getAllProducts();
  };

  return (
    <div>
      <Navbar />
      <div className="jumbotron text-center">
        <h1>Product list</h1>
      </div>
      <div className="container">
        <div
          className="alert alert-success"
          role="alert"
          id="message"
          style={{ display: "none" }}
        ></div>
        <div className="col-12 pb-4">
          <button
            className="btn btn-danger"
            id="delete-product-btn"
            name="delete"
            onClick={deleteProduct}
          >
            MASS DELETE
          </button>
        </div>
        <div className="products col-12 row">
          {products?.map((product) => (
            <div className="col-lg-3 pb-4 col-sm-4 col-md-4 col-xs-6">
              <div className="card" style={{ width: "100%", height: "auto" }}>
                <div className="card-body">
                  <div className="form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="delete-checkbox"
                        name="delete-checkbox"
                        value={product.sku}
                        onChange={(e) => handleCheckBox(e)}
                      />
                    </label>
                  </div>
                  <h4 className="card-title">{product.sku}</h4>
                  <p className="card-text">{product.name}</p>
                  <p className="card-text">{product.price}$</p>
                  <p className="card-text">
                    {product.type === 0
                      ? "Size: "
                      : product.type === 1
                      ? "Weight: "
                      : "Dimension: "}
                    {product.attribute}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
