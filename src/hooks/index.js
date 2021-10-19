import React from "react";

import { DrinkProvider } from "./DrinkContext";

const AppProvider = ({ children }) => <DrinkProvider>{children}</DrinkProvider>;

export default AppProvider;
