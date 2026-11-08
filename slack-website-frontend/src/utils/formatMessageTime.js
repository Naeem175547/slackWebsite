// Turns a message timestamp into e.g. "3:45 PM", "Yesterday, 3:45 PM",
// "Nov 5, 3:45 PM" or "Nov 5, 2025, 3:45 PM" (older years).
export const formatMessageTime = (value) => {
  if (!value) return 'Just now';

  // Accept ISO strings, Date objects and millisecond timestamps (number or numeric string)
  const date = new Date(/^\d+$/.test(String(value)) ? Number(value) : value);
  if (Number.isNaN(date.getTime())) return 'Just now';

  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  const now = new Date();
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const daysAgo = Math.round((startOfDay(now) - startOfDay(date)) / 86400000);

  if (daysAgo === 0) return time;
  if (daysAgo === 1) return `Yesterday, ${time}`;

  const day = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== now.getFullYear() && { year: 'numeric' }),
  });
  return `${day}, ${time}`;
};
