import React, { useCallback, useContext, useState } from "react";

import { createContext } from "react";

const DrinkContext = createContext({});

const DrinkProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSetDrinks = useCallback((data) => {
    setDrinks(data);
  }, []);

  const changeLoading = useCallback((data) => {
    setLoading(data);
  }, []);

  return (
    <DrinkContext.Provider
      value={{ drinks, handleSetDrinks, changeLoading, loading }}
    >
      {children}
    </DrinkContext.Provider>
  );
};

function useDrink() {
  const context = useContext(DrinkContext);

  if (!context) {
    throw new Error("useDrink must be used within an DrinkProvider");
  }

  return context;
}

export { DrinkProvider, useDrink };
