import React, { createContext, useContext, useEffect, useState } from "react";
// import users from '../../assets/dummy.json';
import useApiCall from "../hooks/useApiCall"

// Create a context
const AppContext = createContext();

// Custom hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}

// Context provider component
export function AppContextProvider({ children }) {
  const [allCustomers, setAllCustomers] = useState([]);
  const [serverConn, setServerConn] = useState(true);
  const {error, data, } = useApiCall()

  useEffect(() => {
    const loadApp = async () => {
      try {
        // Remove duplicate entries from the users array based on a unique property, e.g., transactionID
        const uniqueUsers = users.filter((user, index, self) =>
          index === self.findIndex((u) => u.id === user.id)
        );
        
        setAllCustomers(uniqueUsers);
      } catch (error) {
        console.error('Error loading app data:', error);
        setServerConn(false);
      }
    };

    loadApp();
  }, []);

  useEffect(() => {
    console.log('user data updated ')
    console.log(allCustomers)
  }, [allCustomers]);

  return (
    <AppContext.Provider value={{ allCustomers, setAllCustomers, serverConn }}>
      {children}
    </AppContext.Provider>
  );
}
