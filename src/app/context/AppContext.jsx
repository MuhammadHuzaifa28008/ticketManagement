import React, { createContext, useContext, useEffect, useState } from "react";
import users from '../../assets/dummy.json';

// Create a context
const AppContext = createContext();

// Custom hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}

// Context provider component
export function AppContextProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [serverConn, setServerConn] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      try {
        // Remove duplicate entries from the users array based on a unique property, e.g., transactionID
        const uniqueUsers = users.filter((user, index, self) =>
          index === self.findIndex((u) => u.transactionID === user.transactionID)
        );
        
        setUserData(uniqueUsers);
      } catch (error) {
        console.error('Error loading app data:', error);
        setServerConn(false);
      }
    };

    loadApp();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      console.log('User data updated:', userData);
    }
  }, [userData]);

  return (
    <AppContext.Provider value={{ userData, serverConn }}>
      {children}
    </AppContext.Provider>
  );
}
