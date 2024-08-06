import { format } from 'date-fns';

export function  formatDate (dateString){
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
};


export function formatDateReadable (dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMM yy');
}
