import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import products from "../../data/products.json";
import {
  faArrowLeft,
  faArrowRight,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";

const ProductStock = () => {
  // const stockData = products.categories.flatMap((c) => c.products);

  const stockData = useMemo(
    () =>
      products.categories.flatMap((cat) =>
        cat.products.map((product) => ({ ...product, category: cat.name }))
      ),
    []
  );

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const startIndex = currentPage * productsPerPage;
  const selectedProducts = useMemo(() => {
    return stockData.slice(startIndex, startIndex + productsPerPage);
  }, [stockData, startIndex, productsPerPage]);

  const nextPage = () => {
    if (startIndex + productsPerPage < stockData.length) {
      setCurrentPage((c) => c + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((c) => c - 1);
    }
  };

  return (
    <main id="stock" className="dashboard-main">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-6">
        <h1 className="page-head">Product Stock</h1>
        <input
          type="search"
          name="stock-search"
          id="stock-search"
          placeholder="Search product name"
          className="px-4 py-2 bg-gray-700 rounded-full w-full max-w-[20rem] focus:outline-2 focus:outline-(--hero-color)"
        />
      </div>
      {/* table area */}
      <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700/50 text-xs uppercase font-medium text-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4">
                Image
              </th>
              <th scope="col" className="px-6 py-4">
                Product Name
              </th>
              <th scope="col" className="px-6 py-4">
                Category
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Piece
              </th>
              <th scope="col" className="px-6 py-4">
                Available Color
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {selectedProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-600">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-gray-800"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-red-500/20 text-gray-300 hover:text-red-500 transition-colors">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-400">Showing {startIndex + 1}-{startIndex + productsPerPage} of {stockData.length}</p>
        <div className="flex divide-x divide-gray-700 rounded-sm overflow-hidden">
          <button onClick={prevPage} className="px-2 py-1 bg-(--secondary-color) hover:bg-(--secondary-color)/30 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={nextPage} className="px-2 py-1 bg-(--secondary-color) hover:bg-(--secondary-color)/30 transition-colors">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductStock;
