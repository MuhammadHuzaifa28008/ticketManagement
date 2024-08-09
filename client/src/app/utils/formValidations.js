export const validateCustomerInfo = (formData, setErrors ) => {
    let newErrors = {};
    const today = new Date();
    const minYear = 1940;
    const maxTravelDate = new Date(today);
    maxTravelDate.setFullYear(today.getFullYear() + 1); // 1 year in the future
    const minTravelDate = new Date(today);
    minTravelDate.setFullYear(today.getFullYear() - 1); // 1 year in the past
  
    const validateDayAndMonth = (date, fieldName) => {

      // Parse the date
      const parsedDate = new Date(date);
    
      // Extract year, month, and day
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth() + 1; // getMonth() returns 0-based month
      const day = parsedDate.getDate();
    
      // Check if the date is valid
      if (isNaN(parsedDate.getTime())) {
        newErrors[fieldName] = 'Invalid date format. - yyyy-mm-dd';
      }
    
      // Check if year is valid
      if (year < 0) {
        newErrors[fieldName] = 'Year must be a valid positive number.';
  
      }
    
      // Check if the month is valid
      if (month < 1 || month > 12) {
        newErrors[fieldName] = 'Month must be between 1 and 12.';
     
      }
    
      // Check if the day is valid for the given month and year
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) {
        newErrors[fieldName] = `Day must be between 1 and ${daysInMonth} for the month ${month} in the year ${year}.`;
       
      }
    };
    
  
    // Check required fields
    if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.PNRNo) newErrors.PNRNo = 'PNR# is required';
    if (!formData.dateOfTraveling) newErrors.dateOfTraveling = 'Date of Traveling is required';
    if (!formData.dateOfIssue) newErrors.dateOfIssue = 'Date of Issue is required';
    if (!formData.ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';
    if (!formData.profit) newErrors.profit = 'Profit is required';
    if (!formData.invoiceAmount) newErrors.invoiceAmount = 'Invoice Amount is required';
    // if (!formData.amountPaid) newErrors.amountPaid = 'Amount Paid is required';
  
    // Validate Date of Birth
    if (formData.dob) {
      const dobYear = new Date(formData.dob).getFullYear();
      if (dobYear > today.getFullYear()) { // dob cannot be in the future
        newErrors.dob = 'Date of birth cannot be a future date.';
      } else if (dobYear < minYear) {
        newErrors.dob = `Year cannot be less than ${minYear}.`;
      }
      validateDayAndMonth(formData.dob, 'dob');
    }
  
    // Validate Date of Traveling and Date of Issue
    const validateDate = (date, fieldName) => {
      const parsedDate = new Date(date);
      if (parsedDate > maxTravelDate) {
        newErrors[fieldName] = 'Date cannot be more than 1 year in the future.';
      } else if (parsedDate < minTravelDate) {
        newErrors[fieldName] = 'Date cannot be more than 1 year in the past.';
      }
    };
  
    if (formData.dateOfTraveling) {
      validateDate(formData.dateOfTraveling, 'dateOfTraveling');
      validateDayAndMonth(formData.dateOfTraveling, 'dateOfTraveling');
    }
  
    if (formData.dateOfIssue) {
      validateDate(formData.dateOfIssue, 'dateOfIssue');
      validateDayAndMonth(formData.dateOfIssue, 'dateOfIssue');
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




export  const createCustomerValidation = (formData, setErrors)=>{
    let newErrors = {};
    const today = new Date();
    const minYear = 1940;
    const maxTravelDate = new Date(today);
    maxTravelDate.setFullYear(today.getFullYear() + 1); // 1 year in the future
    const minTravelDate = new Date(today);
    minTravelDate.setFullYear(today.getFullYear() - 1); // 1 year in the past
  
    const validateDayAndMonth = (date, fieldName) => {

      // Parse the date
      const parsedDate = new Date(date);
    
      // Extract year, month, and day
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth() + 1; // getMonth() returns 0-based month
      const day = parsedDate.getDate();
    
      // Check if the date is valid
      if (isNaN(parsedDate.getTime())) {
        newErrors[fieldName] = 'Invalid date format. - yyyy-mm-dd';
      }
    
      // Check if year is valid
      if (year < 0) {
        newErrors[fieldName] = 'Year must be a valid positive number.';
  
      }
    
      // Check if the month is valid
      if (month < 1 || month > 12) {
        newErrors[fieldName] = 'Month must be between 1 and 12.';
     
      }
    
      // Check if the day is valid for the given month and year
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) {
        newErrors[fieldName] = `Day must be between 1 and ${daysInMonth} for the month ${month} in the year ${year}.`;
       
      }
    };
    
  
    // Check required fields
    if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.PNRNo) newErrors.PNRNo = 'PNR# is required';
    if (!formData.dateOfTraveling) newErrors.dateOfTraveling = 'Date of Traveling is required';
    if (!formData.dateOfIssue) newErrors.dateOfIssue = 'Date of Issue is required';
    if (!formData.ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';
    if (!formData.profit) newErrors.profit = 'Profit is required';
    if (!formData.invoiceAmount) newErrors.invoiceAmount = 'Invoice Amount is required';
    // if (!formData.amountPaid) newErrors.amountPaid = 'Amount Paid is required';
  
    // Validate Date of Birth
    if (formData.dob) {
      const dobYear = new Date(formData.dob).getFullYear();
      if (dobYear > today.getFullYear()) { // dob cannot be in the future
        newErrors.dob = 'Date of birth cannot be a future date.';
      } else if (dobYear < minYear) {
        newErrors.dob = `Year cannot be less than ${minYear}.`;
      }
      validateDayAndMonth(formData.dob, 'dob');
    }
  
    // Validate Date of Traveling and Date of Issue
    const validateDate = (date, fieldName) => {
      const parsedDate = new Date(date);
      if (parsedDate > maxTravelDate) {
        newErrors[fieldName] = 'Date cannot be more than 1 year in the future.';
      } else if (parsedDate < minTravelDate) {
        newErrors[fieldName] = 'Date cannot be more than 1 year in the past.';
      }
    };
  
    if (formData.dateOfTraveling) {
      validateDate(formData.dateOfTraveling, 'dateOfTraveling');
      validateDayAndMonth(formData.dateOfTraveling, 'dateOfTraveling');
    }
  
    if (formData.dateOfIssue) {
      validateDate(formData.dateOfIssue, 'dateOfIssue');
      validateDayAndMonth(formData.dateOfIssue, 'dateOfIssue');
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }