import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/tr";
import "dayjs/locale/kk";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);
dayjs.extend(isoWeek); // for accurate week detection

const WEEKDAYS: Record<string, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  ru: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
  tr: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
  kk: ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"],
};

const MONTHS: Record<string, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  kk: ["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"],
};

export function getSmartTime(isoString: string, locale: "en" | "ru" | "tr" | "kz" = "en", lengthOfMonthWeek?: number): string {
  const input = dayjs(isoString);
  const now = dayjs();
  dayjs.locale(locale);

  if (input.isToday()) {
    return input.format("HH:mm");
  }

  // same ISO week (Sunday–Saturday or Monday–Sunday, depending on locale)
  const sameWeek = input.isoWeek() === now.isoWeek() && input.year() === now.year();
  if (sameWeek) {
    const dayIndex = input.day(); // 0-6
    return WEEKDAYS[locale]?.[dayIndex] ?? WEEKDAYS["en"][dayIndex];
  }

  // same year
  if (input.year() === now.year()) {
    const day = input.date();
    const month = MONTHS[locale]?.[input.month()] ?? MONTHS["en"][input.month()];
    return `${day} ${month}`;
  }

  // different year
  const day = input.date();
  const month = MONTHS[locale]?.[input.month()] ?? MONTHS["en"][input.month()];
  const year = input.year();
  return `${day} ${month} ${year}`;
}
