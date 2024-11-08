import { useState } from "react";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [details, setDetails] = useState("1");

  const handelDetails = (id) => {
    setDetails(id);
  };
  return (
    <div className="flex m-4">
      <AddProduct />
      <ProductList detailShow={handelDetails} />
      <ProductDetails id={details} />
      <ToastContainer />
    </div>
  );
};

export default App;
