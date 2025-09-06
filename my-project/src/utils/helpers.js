export function isWeekendForCountry(date) {
  // PDF said Fri (5) + Sat (6) are weekends
  const day = date.getDay(); // 0=Sun
  return day === 5 || day === 6;
}

export function formatDateISO(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

export function calculateAge(dobStr) {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
