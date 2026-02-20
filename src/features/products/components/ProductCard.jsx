import { useFavorites } from "../context/FavoritesContext";
import { faHeart, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCard = ({ product }) => {
  const { toggleFavoriteList, isInFavoriteList } = useFavorites();
  const isFavorite = isInFavoriteList(product.id);

  return (
    <div className=" bg-(--secondary-color) overflow-hidden rounded-lg transition duration-300 hover:-translate-y-2">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details relative p-4 md:p-6">
        <h2>{product.name}</h2>
        <span className="text-(--hero-color) block mt-2">${product.price}</span>
        <p className="rate">
          {product.rating} <span className="total-rates">(100)</span>
        </p>
        <button
          className={`absolute top-6 right-5 bg-gray-500 px-2 py-1 rounded-full cursor-pointer transition-colors ${
            isFavorite ? "text-red-500 bg-white" : "bg-gray-500 text-white"
          }`}
          onClick={() => toggleFavoriteList(product)}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartCirclePlus} />
        </button>
      </div>
      <button className="mx-4 mb-4 md:mx-6 md:mb-6 w-fit bg-gray-500 px-4 py-2 cursor-pointer rounded-lg">
        Edit product
      </button>
    </div>
  );
};

export default ProductCard;
