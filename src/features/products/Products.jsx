import products from "../../data/products.json";
import ProductCard from "./components/ProductCard";
const Products = () => {
  const allProducts = products.categories.flatMap((c) => c.products);
  return (
    <main id="products" className="dashboard-main">
      <h1 className="page-head">Products</h1>
      <div className="flex gap-5 flex-wrap justify-center mt-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Products;
