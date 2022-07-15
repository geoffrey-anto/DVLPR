import { getMonth } from "./getMonth";

export const formatDate = (date: string) => {
    // format date
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const m = getMonth(month);
    const t = hours > 12 ? "PM" : "AM";
    // Add padding to time
    const time = `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${t}`;
    return `${time} · ${m} ${day}, ${year}`;
  };