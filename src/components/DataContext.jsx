import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [response, setResponse] = useState(null);

  return (
    <DataContext.Provider value={{ response, setResponse }}>
      {children}
    </DataContext.Provider>
  );
};
