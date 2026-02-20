import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFilters } from "../hooks/useFilters";
import OrderDateFilter from "./OrderDateFilter";
import OrderTypeFilter from "./OrderTypeFilter";
import OrderStatusFilter from "./OrderStatusFilter";
import { useRef } from "react";
const FiltersContainer = () => {
  const filterGroupRef = useRef(null);
  const { resetAllFilters, toggleFilter, setOpenFilter } = useFilters();

  useClickOutside(filterGroupRef, () => {
    setOpenFilter(null);
  });

  return (
    <div
      ref={filterGroupRef}
      className="filters-container flex my-4 bg-gray-700/50 w-fit divide-x divide-gray-700 rounded-xl"
    >
      <div className="relative">
        <button
          id="date"
          onClick={toggleFilter}
          className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors rounded-l-xl"
        >
          Date <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <OrderDateFilter />
      </div>
      <div className="relative">
        <button
          id="type"
          className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={toggleFilter}
        >
          Order Type <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <OrderTypeFilter />
      </div>
      <div className="relative">
        <button
          id="status"
          onClick={toggleFilter}
          className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors"
        >
          Order Status <FontAwesomeIcon icon={faAngleDown} />
        </button>
        <OrderStatusFilter />
      </div>
      <button
        id="reset"
        onClick={resetAllFilters}
        className="p-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 transition-colors rounded-r-xl text-[#FF8743]"
      >
        <FontAwesomeIcon icon={faRotateRight} /> Reset All
      </button>
    </div>
  );
};
export default FiltersContainer;
