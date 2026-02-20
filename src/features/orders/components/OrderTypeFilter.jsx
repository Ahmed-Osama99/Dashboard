import FilterWrapper from "./FilterWrapper";
import FilterCard from "./FilterCard";
import { useFilters } from "../hooks/useFilters.js";
import { useMemo } from "react";
const OrderTypeFilter = () => {
  // filter context
  const { ordersData, chosenTypes, toggleChosenTypes, filterHandle } =
    useFilters();
  const ordersType = useMemo(() => {
    return [...new Set(ordersData.map((order) => order.type))];
  }, [ordersData]);
  return (
    <FilterWrapper
      id="type"
      disabled={!chosenTypes.length}
      action={() => filterHandle("type")}
    >
      {/* Header */}
      <h2 className="grow font-bold text-lg pb-4">Select Order Type</h2>
      <div className="flex flex-wrap gap-2 py-4">
        {ordersType.map((type) => (
          <FilterCard
            key={type}
            content={type}
            onClick={() => toggleChosenTypes(type)}
            className={chosenTypes.includes(type) && "bg-(--hero-color)"}
          />
        ))}
      </div>
    </FilterWrapper>
  );
};

export default OrderTypeFilter;
