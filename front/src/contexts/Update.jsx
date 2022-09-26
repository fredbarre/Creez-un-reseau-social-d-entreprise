import { createContext, useContext, useState } from "react";

export const UpdateContext = createContext();
export const UpdateProvider = ({ children }) => {
  const [lastUpdate, setDate] = useState(new Date());
  const update = () => setDate(new Date());
  return (
    <UpdateContext.Provider value={{ lastUpdate, update }}>
      {children}
    </UpdateContext.Provider>
  );
};

export function useUpdate() {
  const { lastUpdate, update } = useContext(UpdateContext);
  return { lastUpdate, update };
}
