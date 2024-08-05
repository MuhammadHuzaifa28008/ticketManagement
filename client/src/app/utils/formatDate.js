import { format } from 'date-fns';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy');
};

export default formatDate;
