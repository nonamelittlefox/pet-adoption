export const handleBreakLastDate = data => {
  let lastDate = '';

  const len = data.length;
  let idx = 0;

  while (idx < len) {
    if (data[idx].created_at_in_date !== lastDate) {
      lastDate = data[idx].created_at_in_date;

      data[idx].lastDate = true;
    } else {
      data[idx].lastDate = false;
    }

    idx++;
  }

  return data;
};
