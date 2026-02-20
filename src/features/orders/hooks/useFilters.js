import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext.jsx";

export const useFilters = () => useContext(FiltersContext);
