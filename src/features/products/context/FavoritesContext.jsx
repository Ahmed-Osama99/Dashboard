import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // get from local storage if found
  const storedFavoriteList = JSON.parse(localStorage.getItem("favoriteList"));
  const [favoriteList, setFavoriteList] = useState(storedFavoriteList || []);
  // add / remove product from favoriteList
  const toggleFavoriteList = (product) => {
    setFavoriteList((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };
  // check specific product(id) in favoriteList
  const isInFavoriteList = (id) => {
    return favoriteList.some((item) => item.id === id);
  };

  useEffect(() => {
    // store/update favoriteList in local storage
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  return (
    <FavoritesContext.Provider
      value={{ favoriteList, toggleFavoriteList, isInFavoriteList }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);
