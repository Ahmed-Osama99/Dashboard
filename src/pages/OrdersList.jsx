import { useMemo, useState } from "react";
import Calendar from "../components/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import orders from "../data/orders.json";

const OrdersList = () => {
  const ordersData = useMemo(() => orders, []);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDateOpen,setIsDateOpen] = useState(false)
  const ordersPerPage = 9;
  const startIndex = currentPage * ordersPerPage;
  const selectedOrders = useMemo(() => {
    return ordersData.slice(startIndex, ordersPerPage + startIndex);
  }, [startIndex, ordersData, ordersPerPage]);

  const nextPage = () => {
    if (startIndex + ordersPerPage < ordersData.length)
      setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (startIndex > 0) setCurrentPage((p) => p - 1);
  };

  const statusColor = {
    completed: "#00B69B",
    processing: "#6226EF",
    rejected: "#EF3826",
    "on hold": "#FFA756",
    "in transit": "#BA29FF",
  };
  return (
    <main id="orders" className="dashboard-main">
      <h1 className="page-head">Orders List</h1>
      <div className="filters-container flex my-4 bg-gray-700/50 w-fit divide-x divide-gray-700 rounded-xl">
        <div className="relative ">
          <button
          onClick={()=>setIsDateOpen(!isDateOpen)}
            id="date"
            className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors rounded-l-xl"
          >
            Date <FontAwesomeIcon icon={faAngleDown} />
          </button>
          <Calendar className={` absolute top-full z-50 ${isDateOpen ? 'block' : 'hidden'}`} />
        </div>
        <button
          id="type"
          className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors"
        >
          Order Type <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <button
          id="status"
          className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors"
        >
          Order Status <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <button
          id="reset"
          className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors rounded-r-xl text-[#FF8743]"
        >
          Reset All{" "}
        </button>
      </div>
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
              <tr
                key={order.id}
                className="hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4 font-medium text-white">
                  {order.name}
                </td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 capitalize">{order.type}</td>
                <td className="px-6 py-4 capitalize">
                  <span
                    style={{
                      backgroundColor: statusColor[order.status],
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color: "white",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-400">
          Showing {startIndex + 1}-{startIndex + ordersPerPage} of{" "}
          {ordersData.length}
        </p>
        <div className="flex divide-x divide-gray-700 rounded-sm overflow-hidden">
          <button
            onClick={prevPage}
            className="px-2 py-1 bg-(--secondary-color) hover:bg-(--secondary-color)/30 transition-colors"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            onClick={nextPage}
            className="px-2 py-1 bg-(--secondary-color) hover:bg-(--secondary-color)/30 transition-colors"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default OrdersList;
