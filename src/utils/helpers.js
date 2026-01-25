import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

//// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();
  if (options?.end) {
    today.setUTCHours(23, 50, 50, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }
  return today.toISOString();
};
