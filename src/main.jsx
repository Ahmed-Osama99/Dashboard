import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style/index.css";
import App from "./App.jsx";
import { FavoritesProvider } from "./features/products/context/FavoritesContext.jsx";
import { FiltersProvider } from "./features/orders/context/FiltersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
);
