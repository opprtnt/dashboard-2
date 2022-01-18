import { ChangeEvent } from 'react';

const mounthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const convertDate = (sec: number) => {
  const date = new Date(sec * 1000);
  const formatDate = mounthList[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  return formatDate;
};

export const convertTime = (sec: number) => {
  const date = new Date(sec * 1000);
  const formatTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  return formatTime;
};

export const getLastUpdate = (sec: number) => {
  const convertDay = Math.floor(sec / 3600 / 24);
  if (convertDay < 1) return 'Updated';
  return convertDay > 1 ? `Updated ${convertDay} days ago` : `Updated ${convertDay} day ago`;
};

// export function debounce(func: (e: ChangeEvent<HTMLInputElement>) => void, timeout: number) {
//   let timer = 0;
//   return (...args: any[]) => {
//     window.clearTimeout(timer);
//     timer = window.setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }
