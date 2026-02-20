import { useMemo } from "react";
import { useFilters } from "../hooks/useFilters";
import FilterWrapper from "./FilterWrapper";
import FilterCard from "./FilterCard";

const OrderStatusFilter = () => {
  const { ordersData, chosenStatus, filterHandle, toggleChosenStatus } =
    useFilters();
  const ordersStatus = useMemo(() => {
    return [...new Set(ordersData.map((order) => order.status))];
  }, [ordersData]);
  return (
    <FilterWrapper
      id="status"
      disabled={!chosenStatus.length}
      action={() => filterHandle("status")}
    >
      {/* Header */}
      <h2 className="grow font-bold text-lg pb-4">Select Order Status</h2>
      <div className="flex flex-wrap gap-2 py-4">
        {ordersStatus.map((status) => (
          <FilterCard
            key={status}
            content={status}
            onClick={() => toggleChosenStatus(status)}
            className={chosenStatus.includes(status) && "bg-(--hero-color)"}
          />
        ))}
      </div>
    </FilterWrapper>
  );
};

export default OrderStatusFilter;
