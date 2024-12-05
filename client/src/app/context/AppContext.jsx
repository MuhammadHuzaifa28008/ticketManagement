import React, { createContext, useContext, useEffect, useState } from "react";
// import users from '../../assets/dummy.json';
import useApiCall from "../hooks/useApiCall"
import axios from 'axios'

// Create a context
const AppContext = createContext();

// Custom hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}

// Context provider component
export function AppContextProvider({ children }) {
  const [allCustomers, setAllCustomers] = useState([]);
  const [dbStats, setDBStats] = useState({})
  const [fetch, setFetch] = useState(true);
  const {error, data, loading, makeApiCall} = useApiCall()
  const [fatalError, setFatalError] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      try {
        makeApiCall('http://localhost:5000/customer/all');
      } catch (error) {
        // console.error('Error loading app data:', error);
        setServerConn(false);
      }
      
    };

    const loadMemoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/utils/db-stats');
        const result = response.data; // Axios automatically parses JSON responses
        setDBStats(result);
      } catch (error) {
        console.error('Error loading DB stats:', error);
        // Handle error (e.g., set some state or show a message)
      }
    };
  if(fetch) {
    console.log('loading context data')
    loadApp()
    loadMemoryData()
    setFetch(false)
  }
  }, [fetch, setFetch]);
  
  useEffect(() => {
    if (data) {
      setAllCustomers(data);
      // console.log(data);
    }
    if (error) console.error(error);
  }, [data, error]);

  
  

  return (
    <AppContext.Provider value={{ error, contextLoading:loading , dbStats, allCustomers, setFetch }}>
      {children}
    </AppContext.Provider>
  );
}
