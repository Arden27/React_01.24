export const formatTime = (seconds: number) => {
  const sign = seconds < 0 ? '-' : '';
  const absoluteSeconds = Math.abs(seconds);
  return `${sign}${String(Math.floor(absoluteSeconds / 60)).padStart(2, '0')}:${String(absoluteSeconds % 60).padStart(2, '0')}`;
}
