import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import orders from "../../../data/orders.json";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const ordersData = useMemo(() => orders, []);
  const [currentPage, setCurrentPage] = useState(0);
  const [chosenDates, setChosenDates] = useState([]);
  const [chosenTypes, setChosenTypes] = useState([]);
  const [chosenStatus, setChosenStatus] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  // toggle data will view
  const dataWillDisplay = useMemo(() => {
    return filteredOrders.length ? filteredOrders : ordersData;
  }, [filteredOrders, ordersData]);
  // orders will render per page
  const ordersPerPage = Math.min(9, dataWillDisplay.length);
  // page start order
  const startOrder = currentPage * ordersPerPage;
  // toggle chosen dates
  const toggleChosenDates = (day) => {
    const isChosen = chosenDates.includes(day);
    setChosenDates((prev) =>
      isChosen ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };
  // toggle chosen types
  const toggleChosenTypes = (type) => {
    const isChosen = chosenTypes.includes(type);
    setChosenTypes((prev) =>
      isChosen ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };
  // toggle chosen types
  const toggleChosenStatus = (status) => {
    const isChosen = chosenStatus.includes(status);
    setChosenStatus((prev) =>
      isChosen ? prev.filter((s) => s !== status) : [...prev, status],
    );
  };
  // for open / close filters
  const toggleFilter = (e) => {
    /* tricky hint : use currentTarget to get the button id 
    whatever if i clicked on icon or text 
    (while e.target dose not work efficient when there is icon inside button) */

    const id = e.currentTarget.id;
    setOpenFilter((currOpen) => (currOpen === id ? null : id));
  };
  // helper: for trigger change
  useEffect(() => {
    console.log(chosenTypes);
  }, [chosenTypes]);

  // Helper: Display format for the UI "14 Oct 2024"
  const formatDisplayDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  //
  const filterHandle = useCallback(
    (filterType) => {
      if (!dataWillDisplay) return;
      if (filterType === "date") {
        setFilteredOrders(
          dataWillDisplay.filter((order) =>
            chosenDates.includes(formatDisplayDate(order.date)),
          ),
        );
      } else if (filterType === "type") {
        setFilteredOrders(
          dataWillDisplay.filter((order) => chosenTypes.includes(order.type)),
        );
      } else {
        setFilteredOrders(
          dataWillDisplay.filter((order) =>
            chosenStatus.includes(order.status),
          ),
        );
      }
      setCurrentPage(0);
      setOpenFilter(null);
    },
    [chosenDates, chosenTypes, chosenStatus, dataWillDisplay],
  );

  const resetAllFilters = () => {
    setFilteredOrders([]);
    setChosenDates([]);
    setChosenTypes([]);
    setChosenStatus([]);
    setOpenFilter(null);
  };

  return (
    <FiltersContext.Provider
      value={{
        ordersData,
        chosenDates,
        chosenTypes,
        chosenStatus,
        openFilter,
        dataWillDisplay,
        filteredOrders,
        startOrder,
        ordersPerPage,
        toggleChosenDates,
        toggleChosenTypes,
        toggleChosenStatus,
        formatDisplayDate,
        filterHandle,
        setOpenFilter,
        resetAllFilters,
        toggleFilter,
        setCurrentPage,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext }; // Export context separately