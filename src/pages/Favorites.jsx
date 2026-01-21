import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";
const Favorites = () => {
  const { favoriteList } = useFavorites();
  return (
    <main id="favorites" className="dashboard-main">
      <h1 className="page-head">Favorites</h1>
      {favoriteList && favoriteList.length > 0 ? (
        <div className="flex gap-5 flex-wrap justify-center mt-4">
          {favoriteList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Your Favorite list is currently empty.
          </p>
        </div>
      )}
    </main>
  );
};

export default Favorites;
