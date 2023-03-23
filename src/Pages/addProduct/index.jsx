import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = React.useState({
    sku: "",
    name: "",
    price: null,
    type: "0",
  });

  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  const clearForm = () => {
    navigate("/");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sku", product.sku);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("type", product.type);
    if (product.type === "0") {
      formData.append("size", product.size);
    }
    if (product.type === "1") {
      formData.append("weight", product.weight);
    } else {
      formData.append("height", product.height);
      formData.append("width", product.width);
      formData.append("length", product.length);
    }
    const res = await axios.post(
      "https://alihaiderscandiweb.000webhostapp.com/products/add",
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    setResponse(res.data);
    if (res.data.status !== "danger") {
      navigate("/");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="jumbotron text-center">
        <h1>Add product</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form method="post" onSubmit={handlePost} id="product_form">
              {response.status === "danger" ? (
                <div className="alert alert-danger" role="alert" id="message">
                  {response.message}
                </div>
              ) : (
                ""
              )}
              <div className="form-group">
                <label for="sku">SKU</label>
                <input
                  type="text"
                  id="sku"
                  className="form-control"
                  name="sku"
                  required
                  onChange={(e) =>
                    setProduct({ ...product, sku: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label for="price">Price</label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  className="form-control"
                  name="price"
                  required
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label for="type">Type</label>
                <select
                  className="form-control"
                  id="productType"
                  name="type"
                  required
                  onChange={(e) =>
                    setProduct({ ...product, type: e.target.value })
                  }
                >
                  <option value="0" id="DVD">
                    DVD
                  </option>
                  <option value="1" id="Book">
                    Book
                  </option>
                  <option value="2" id="Furniture">
                    Furniture
                  </option>
                </select>
              </div>
              <div className="form-group" id="attributes">
                {product.type === "0" ? (
                  <>
                    <label for="size">Size (MB)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="size"
                      placeholder="Please, provide size"
                      required
                      id="size"
                      onChange={(e) =>
                        setProduct({ ...product, size: e.target.value })
                      }
                    />
                  </>
                ) : product.type === "1" ? (
                  <>
                    <label for="weight">Weight (KG)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="weight"
                      placeholder="Please, provide weight"
                      id="weight"
                      required
                      onChange={(e) =>
                        setProduct({ ...product, weight: e.target.value })
                      }
                    />
                  </>
                ) : product.type === "2" ? (
                  <>
                    {" "}
                    <label for="height">Height</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="height"
                      placeholder="Please, provide height"
                      id="height"
                      required
                      onChange={(e) =>
                        setProduct({ ...product, height: e.target.value })
                      }
                    />
                    <label for="width">Width</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="width"
                      placeholder="Please, provide width"
                      id="width"
                      required
                      onChange={(e) =>
                        setProduct({ ...product, width: e.target.value })
                      }
                    />
                    <label for="length">Length</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      placeholder="Please, provide length"
                      name="length"
                      id="length"
                      required
                      onChange={(e) =>
                        setProduct({ ...product, length: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <label for="size">Size (MB)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Please, provide size"
                      name="size"
                      required
                      id="size"
                      onChange={(e) =>
                        setProduct({ ...product, size: e.target.value })
                      }
                    />
                  </>
                )}
              </div>
              <button
                id="submit"
                type="submit"
                className="btn btn-primary"
                name="submit"
              >
                Save
              </button>
              <button
                onClick={() => clearForm()}
                className="btn m-2"
                name="cancel"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
