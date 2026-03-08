import { format, parseISO, differenceInDays } from 'date-fns';

export function formatDate(dateStr: string, pattern = 'MMM d, yyyy'): string {
  try {
    return format(parseISO(dateStr), pattern);
  } catch {
    return dateStr;
  }
}

export function formatDateShort(dateStr: string): string {
  return formatDate(dateStr, 'MMM d');
}

export function tripDuration(startDate: string, endDate: string): number {
  try {
    return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
  } catch {
    return 0;
  }
}

export function formatTime(time: string): string {
  try {
    const [h, m] = time.split(':');
    const hours = parseInt(h, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  } catch {
    return time;
  }
}
