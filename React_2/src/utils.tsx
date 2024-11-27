import dayjs from "dayjs";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type DateType = {
  year: number;
  month: number;
};

export function getDaysInMonthWithSurrounding({ year, month }: DateType) {
  const result = [];

  // 找月份的開始日和结束日
  const startOfCurrentMonth = dayjs(`${year}-${month}`).startOf("month");
  const endOfCurrentMonth = dayjs(`${year}-${month}`).endOf("month");

  // 找當月第一天是星期幾
  const firstDayOfWeek = startOfCurrentMonth.day();
  // 計算需要補上的天数，第一個日期要是星期一
  const daysToPrepend = (firstDayOfWeek + 6) % 7;

  // 前一個月
  for (let i = daysToPrepend; i > 0; i--) {
    // 往後算扣 i 天
    const date = startOfCurrentMonth.subtract(i, "day");
    result.push({
      date: date.format("YYYY-MM-DD"),
      dayOfWeek: daysOfWeek[date.day()],
    });
  }

  // 當月份
  for (
    let date = startOfCurrentMonth;
    // 當日期未超過當月最後一天
    date.isBefore(endOfCurrentMonth) || date.isSame(endOfCurrentMonth);
    date = date.add(1, "day")
  ) {
    result.push({
      date: date.format("YYYY-MM-DD"),
      dayOfWeek: daysOfWeek[date.day()],
    });
  }

  // 後一個月補齊 35
  const daysToAppend = 35 - result.length;
  for (let i = 1; i <= daysToAppend; i++) {
    const date = endOfCurrentMonth.add(i, "day");
    result.push({
      date: date.format("YYYY-MM-DD"),
      dayOfWeek: daysOfWeek[date.day()],
    });
  }

  return result;
}
