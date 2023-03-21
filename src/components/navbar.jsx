import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                List
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => navigate("/add-product")}
                style={{ cursor: "pointer" }}
              >
                ADD
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
