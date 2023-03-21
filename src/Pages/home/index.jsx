import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const endpoint =
      "https://alihaiderscandiweb.000webhostapp.com/products/get";
    const response = await axios.get(endpoint);
    setProducts(response.data);
  };
  const [checkedProducts, setCheckedProducts] = useState([]);

  const deleteProduct = async () => {
    // products.map((products)=>products.)
    const checkbox = document.getElementsByName("products[]");

    const formData = new FormData();
    checkedProducts.map((product, index) => formData.append(index, product));

    const response = await axios.post(
      "https://alihaiderscandiweb.000webhostapp.com/products/delete",
      formData
    );
    getAllProducts();
  };

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
  return (
    <div>
      <Navbar />
      <div className="jumbotron text-center">
        <h1>Product list</h1>
      </div>

      <div className="container">
        {/* <form method="post" action="" className="row"> */}
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
            <div class="col-lg-3 pb-4 col-sm-4 col-md-4 col-xs-6">
              <div class="card" style={{ width: "100%", height: "auto" }}>
                <div class="card-body">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        className="delete-checkbox"
                        name="products[]"
                        value={product.sku}
                        onChange={(e) => handleCheckBox(e)}
                      />
                    </label>
                  </div>
                  <h4 class="card-title">{product.sku}</h4>
                  <p class="card-text">{product.name}</p>
                  <p class="card-text">{product.price}$</p>
                  <p class="card-text">
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
        {/* </form> */}
      </div>
    </div>
  );
};

export default Home;
