import "antd/dist/reset.css";
import "./App.css";
import { Fragment } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { ListProducts } from "./page/ListProduct/ListProducts";
import { Product } from "./page/Product/Product";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
    </Fragment>
  );
}

export default App;
