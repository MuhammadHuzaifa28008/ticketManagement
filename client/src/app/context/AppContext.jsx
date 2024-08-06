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
  const [fetch, setFetch] = useState(true);
  const {error, data, loading, makeApiCall} = useApiCall()

  useEffect(() => {
    const loadApp = async () => {
      try {
        console.log('making api call')
        makeApiCall('http://localhost:5000/customer/all');
      } catch (error) {
        console.error('Error loading app data:', error);
        setServerConn(false);
      }
    };
  if(fetch) loadApp();
  setFetch(false)
  }, [fetch]);
  
  useEffect(() => {
    if (data) {
      setAllCustomers(data);
      // console.log(data);
    }
    if (error) console.error(error);
  }, [data, error]);

  // useEffect(()=>{

  // })
  

  return (
    <AppContext.Provider value={{ error, contextLoading:loading , allCustomers, setFetch }}>
      {children}
    </AppContext.Provider>
  );
}
