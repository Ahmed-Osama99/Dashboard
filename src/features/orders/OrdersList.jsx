import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useFilters } from "./hooks/useFilters";
import FiltersContainer from "./components/FiltersContainer";
import OrderItem from "./components/OrderItem";

const OrdersList = () => {
  const {
    ordersData,
    startOrder,
    ordersPerPage,
    filteredOrders,
    dataWillDisplay,
    setCurrentPage,
  } = useFilters();

  // helper in determine end of every page whatever data returns
  const endOfPage = useMemo(() => {
    const range = startOrder + ordersPerPage;
    if (range > dataWillDisplay.length) {
      return dataWillDisplay.length;
    }
    return range;
  }, [startOrder, dataWillDisplay, ordersPerPage]);
  const selectedOrders = useMemo(() => {
    return dataWillDisplay.slice(startOrder, ordersPerPage + startOrder);
  }, [startOrder, dataWillDisplay, ordersPerPage]);

  const nextPage = () => {
    if (startOrder + ordersPerPage < dataWillDisplay.length)
      setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (startOrder > 0) setCurrentPage((p) => p - 1);
  };

  return (
    <main id="orders" className="dashboard-main">
      <h1 className="page-head">Orders List</h1>
      <FiltersContainer />
      {/* table area */}
      <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700/50 text-xs uppercase font-medium text-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4">
                Id
              </th>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                Address
              </th>
              <th scope="col" className="px-6 py-4">
                Date
              </th>
              <th scope="col" className="px-6 py-4">
                Type
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {selectedOrders.map((order) => (
              <OrderItem order={order} key={order.id} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-400">
          Showing {startOrder + 1}-{endOfPage} of{" "}
          {filteredOrders.length || ordersData.length}
        </p>
        <div className="flex divide-x divide-gray-700 rounded-sm overflow-hidden">
          <button
            onClick={prevPage}
            disabled={startOrder === 0}
            className="px-2 py-1 bg-(--secondary-color) hover:opacity-30 transition-opacity disabled:opacity-30 disabled:cursor-no-drop"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            onClick={nextPage}
            disabled={dataWillDisplay.length === endOfPage}
            className="px-2 py-1 bg-(--secondary-color) hover:opacity-30 transition-opacity disabled:opacity-30 disabled:cursor-no-drop"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default OrdersList;
