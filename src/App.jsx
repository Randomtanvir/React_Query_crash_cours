import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div className="flex m-4">
      <AddProduct />
      <ProductList />
      <ProductDetails id="2" />
    </div>
  );
};

export default App;
