import  { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { useService } from "../../../Context/service.context";


interface DayData {
  date: Date;
  dayOfMonth: number;
}

const RenderCalendar = (): JSX.Element => {
  const { setSelectedDate, scheduler } = useService();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prevMonth, setPrevMonth] = useState<Date | null>(null);
  const [nextMonth, setNextMonth] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = startOfMonth(currentDate).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays: DayData[] = Array.from(
    { length: daysInMonth },
    (_, index) => ({
      date: new Date(year, month, index + 1),
      dayOfMonth: index + 1,
    })
  );

  const previousMonthLastDay = endOfMonth(new Date(year, month, 0)).getDate();
  const previousMonthDays: DayData[] = Array.from(
    { length: firstDayOfMonth },
    (_, index) => ({
      date: new Date(year, month - 1, previousMonthLastDay - index),
      dayOfMonth: previousMonthLastDay - index,
    })
  ).reverse();

  const nextMonthDays: DayData[] = Array.from(
    { length: (7 - ((calendarDays.length + firstDayOfMonth) % 7)) % 7 },
    (_, index) => ({
      date: new Date(year, month + 1, index + 1),
      dayOfMonth: index + 1,
    })
  );

  const allDays = [...previousMonthDays, ...calendarDays, ...nextMonthDays];

  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  allDays.forEach((day, index) => {
    if (index % 7 === 0 && index !== 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  weeks.push(currentWeek);

  useEffect(() => {
    if (prevMonth) {
      setPrevMonth(null);
      setCurrentDate(subMonths(currentDate, 1));
    }
    if (nextMonth) {
      setNextMonth(null);
      setCurrentDate(addMonths(currentDate, 1));
    }
  }, [prevMonth, nextMonth, currentDate]);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [setSelectedDate, currentDate]);

  const handlePrevMonth = () => {
    const previousMonth = subMonths(currentDate, 1);
    if (previousMonth >= startOfMonth(new Date())) {
      setPrevMonth(previousMonth);
    }
  };

  const handleNextMonth = () => {
    setNextMonth(addMonths(currentDate, 1));
  };

  return (
    <section className="w-full h-full px-5 flex flex-col gap-5">
      <div className="flex flex-col justify-between items-center">
        <div className="flex items-center">
          <button onClick={handlePrevMonth} className="mr-2">
            {"<<Previous"}
          </button>
          <h2 className="text-2xl font-bold mb-4">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button onClick={handleNextMonth} className="ml-2">
            {" Next>>"}
          </button>
        </div>
        <table className="table-fixed w-full border-2 border-black">
          <thead>
            <tr className="border-2 border-black">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <th
                    key={index}
                    className={`w-1/7 px-4 py-2 text-center ${!index && "text-red-500"}`}
                  >
                    {day}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, rowIndex) => (
              <tr key={rowIndex}>
                {week.map((day, colIndex) => {
                  const isCurrentDay =
                    isSameDay(day.date, new Date()) && month === currentDate.getMonth();

                  const hasScheduler = scheduler.some((schedule) =>
                    isSameDay(new Date(schedule.date), day.date)
                  );

                  const isAvailable = hasScheduler && Number(day.date) >= Number(new Date());

                  return (
                    <td
                      onClick={() => {
                        setSelectedDate(new Date(day.date));
                      }}
                      key={colIndex}
                      className={`w-1/7 px-4 py-2 text-center cursor-pointer border border-black ${
                        isCurrentDay && "bg-green-200"
                      } ${isAvailable && "bg-secondary"} hover:bg-primary`}
                    >
                      {day.dayOfMonth !== undefined ? day.dayOfMonth : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RenderCalendar;
