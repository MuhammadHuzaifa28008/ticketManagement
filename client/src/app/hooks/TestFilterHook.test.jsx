import React, { useState } from 'react';
import useDynamicFilter from './useDynamicFilter'; // Adjust the path as necessary
import users from '../../assets/dummy.json'



const TestFilterHook = () => {
  const [data, setData] = useState([
    { key1: 'value1', key2: { key2K1: 'key2Value1' } },
    { key1: 'value2', key2: { key2K1: 'key2Value2' } },
    // Add more entries
  ]);

  const [query, setQuery] = useState('');
  const filteredData = useDynamicFilter(users, 'customerName', 'ticketInfo.PNRNo', query);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter..."
        value={query}
        onChange={handleQueryChange}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            {item.customerName} - {item.paymentInfo.dueAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestFilterHook;
