export const isToday = (date: string) => {
  const utcDate = toUTCDate(date);
  const today = new Date();

  return (
    today.getFullYear() === utcDate.getUTCFullYear() &&
    today.getMonth() === utcDate.getUTCMonth() &&
    today.getDate() === utcDate.getUTCDate()
  );
};

export const toUTCDate = (date: string) => {
  return new Date(date);
};

export const toUTCDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const toLocalDate = (date: string) => {
  const utcDate = new Date(date);
  return new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate()
  );
};

export const range = (from: string, to: string) => {
  const result: string[] = [];
  const date = new Date(from);
  const toDate = new Date(to);

  while (date <= toDate) {
    result.push(toUTCDateString(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }

  return result;
};
