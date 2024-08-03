import { useState, useEffect } from 'react';

/**
 * Custom hook for filtering an array based on specified nested keys and query.
 * @param {Array} data - The array to filter.
 * @param {String} key1 - The key to filter by in the first level of the object.
 * @param {String} key2 - The nested key to filter by.
 * @param {String} query - The query string to filter by.
 * @returns {Array} - The filtered array.
 */
function useDynamicFilter(data, key1, key2, query) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Function to get value from nested object
    const getValue = (obj, key) => {
      return key.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // Filter the data based on the query and specified keys
    const result = data.filter(item => {
      const value1 = getValue(item, key1);
      const value2 = getValue(item, key2);

      return (
        (value1 && value1.toLowerCase().includes(query.toLowerCase())) ||
        (value2 && value2.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setFilteredData(result);
  }, [data, key1, key2, query]);

  return filteredData;
}

export default useDynamicFilter;
