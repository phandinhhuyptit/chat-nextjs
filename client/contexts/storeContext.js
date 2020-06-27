import React, { createContext, useReducer, useEffect } from "react";
import { storeReducer } from "../reducers/storeReducer";

export const StoreContext = createContext();

const initialStore = {
  user: {},
  roomId: null,  
};

const StoreContextProvider = props => {
  const [state, dispatch] = useReducer(storeReducer, initialStore);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;