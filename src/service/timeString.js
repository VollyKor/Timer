export default function getTimeString(time) {
  const pad = number => String(number).padStart(2, '0');
  const getHours = () => pad(Math.floor((time % (60 * 60 * 24)) / (60 * 60)));
  const getMinutes = () => pad(Math.floor((time % (60 * 60)) / 60));
  const getSeconds = () => pad(time % 60);
  return `${getHours()} : ${getMinutes()} : ${getSeconds()}`;
}
