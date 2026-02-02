import { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [chosenDates, setChosenDates] = useState([]);
  // toggle chosen dates
  const toggleChosenDates = (day) => {
    const isChosen = chosenDates.includes(day);
    setChosenDates((prev) =>
      isChosen ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  return (
    <FiltersContext.Provider value={{ chosenDates, toggleChosenDates }}>
      {children}
    </FiltersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => useContext(FiltersContext);
