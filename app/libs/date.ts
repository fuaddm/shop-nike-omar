export const isFutureExpirationDate = (value: string): boolean => {
  const [monthString, yearString] = value.split('/');
  const inputMonth = Number.parseInt(monthString, 10);
  const inputYear = 2000 + Number.parseInt(yearString, 10); // Assume 21st century

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed

  if (inputYear < currentYear) {
    return false;
  }
  if (inputYear === currentYear && inputMonth < currentMonth) {
    return false;
  }

  return true;
};
