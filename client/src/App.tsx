import GlobalLayout from "./components/GlobalLayout";
import ProductsDisplay from "./components/ProductsDisplay";

function App() {
  return (
    <div className=" bg-zinc-200 ">
      <GlobalLayout>
        <ProductsDisplay />
      </GlobalLayout>
    </div>
  );
}

export default App;
