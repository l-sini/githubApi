import { format } from 'date-fns';

export const dateTimeShow = (date: Date | number) => {
  const newDate = new Date(date);
  const changedDate = format(newDate, 'yyyy.MM.dd HH:mm');
  return changedDate;
};
