export default function getTimeString(time) {
  const pad = number => String(number).padStart(2, '0');

  const getHours = () =>
    pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const getMinutes = () =>
    pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const getSeconds = () => pad(Math.floor((time % (1000 * 60)) / 1000));

  return `${getHours()} : ${getMinutes()} : ${getSeconds()}`;
}
