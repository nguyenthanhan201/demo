import format from 'date-fns/format';

export function formatDate(
  date: string | Date | number | undefined,
  formatText: 'date' | 'time' | 'datetime' | 'year_month_date' | (string & object) = 'date'
): string {
  let formatString;
  switch (formatText) {
    case 'date': {
      formatString = 'dd/MM/yyyy';
      break;
    }
    case 'time': {
      formatString = 'HH:mm';
      break;
    }
    case 'datetime': {
      formatString = 'HH:mm dd/MM/yyyy';
      break;
    }
    case 'year_month_date': {
      formatString = 'yyyy-MM-dd';
      break;
    }
    default: {
      formatString = formatText;
      break;
    }
  }
  return date ? format(new Date(date), formatString) : '';
}

export function differenceTime(compareTime: string) {
  const currentTime = new Date().getTime();

  const compareTimeInMs = new Date(compareTime).getTime();

  const diff = currentTime - compareTimeInMs;

  const seconds = diff / 1000;

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  }

  const minutes = seconds / 60;

  if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  }

  const hours = minutes / 60;

  if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  }

  const days = hours / 24;

  if (days < 30) {
    return `${Math.floor(days)} days ago`;
  }

  const months = days / 30;

  if (months < 12) {
    return `${Math.floor(months)} months ago`;
  }

  const years = months / 12;

  return `${Math.floor(years)} years ago`;
}
