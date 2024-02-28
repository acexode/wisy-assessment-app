export const abbreviateDate = (dateString: Date) => {
  let date = new Date(dateString);

  let dayAbbr = date.toLocaleString('en', { weekday: 'short' });
  let formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

  let result = `${dayAbbr} ${formattedDate}`;

  return result;
};
