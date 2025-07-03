import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";

import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/tr";
import "dayjs/locale/kk";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);

const WEEKDAYS_SHORT: Record<string, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ru: ["вск", "пнд", "вт", "ср", "чт", "пт", "сб"],
  tr: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cmt"],
  kk: ["Жек", "Дүй", "Сей", "Сәр", "Бей", "Жұм", "Сен"],
};

const MONTHS_SHORT: Record<string, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  kk: ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"],
};

export function getSmartTime(isoString: string, locale: string = "en"): string {
  const input = dayjs(isoString);
  const now = dayjs();
  dayjs.locale(locale);

  if (input.isToday()) {
    return input.format("HH:mm");
  }

  if (input.isYesterday()) {
    return locale === "ru" ? "Вчера" : locale === "tr" ? "Dün" : locale === "kk" ? "Кеше" : "Yesterday";
  }

  const startOfWeek = now.startOf("week");
  if (input.isSameOrAfter(startOfWeek)) {
    const dayIndex = input.day(); // 0-6
    return WEEKDAYS_SHORT[locale]?.[dayIndex] ?? WEEKDAYS_SHORT["en"][dayIndex];
  }

  if (input.year() === now.year()) {
    const monthIndex = input.month(); // 0-11
    const day = input.date();
    const month = MONTHS_SHORT[locale]?.[monthIndex] ?? MONTHS_SHORT["en"][monthIndex];
    return `${day} ${month}`; // e.g. 5 Aug
  }

  const monthIndex = input.month();
  const day = input.date();
  const year = input.year();
  const month = MONTHS_SHORT[locale]?.[monthIndex] ?? MONTHS_SHORT["en"][monthIndex];
  return `${day} ${month} ${year}`; // e.g. 5 Aug 2023
}
