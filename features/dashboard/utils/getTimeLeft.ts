export function getTimeLeft(endDate?: string | null): string {
  if (!endDate) return "No deadline";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  if (isNaN(end.getTime())) {
    return "Invalid date";
  }

  end.setHours(0, 0, 0, 0);

  const diffMs = end.getTime() - today.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays > 0) return `${diffDays} days left`;
  if (diffDays === 0) return "Due today";
  return "⛔ Overdue!";
}
