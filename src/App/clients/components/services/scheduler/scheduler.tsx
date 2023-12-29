import { useEffect, useState } from "react";
import { IScheduler, useService } from "../../../Context/service.context";
import { format } from "date-fns";

function RenderScheduler() {
  const { scheduler, selectedDate } = useService();
  const [filteredScheduler, setFilteredScheduler] = useState<IScheduler[]>([]);
  useEffect(() => {
    setFilteredScheduler(
      scheduler.filter(
        (schedule) =>
          format(
            new Date(schedule.date.split("T")[0] + "T08:00:00Z"),
            "dd/MM/yyyy"
          ) === format(selectedDate ?? new Date(), "dd/MM/yyyy")
      )
    );
  }, [selectedDate]);

  return (
    <div className="flex flex-col  intems-center gap-5 max-h-80 h-full min-h-10 rounded-3xl bg-secondary py-5  ">
      {filteredScheduler.length > 0 ? filteredScheduler.map((schedule: IScheduler) => (
        <div
          key={schedule.id}
          className="flex flex-col  items-center max-h-62 h-full min-h-10 overflow-auto"
        >
          {
            <span className="text-white text-xl text-center ">
              <h1 className="text-white text-xl text-center ">Agendamentos</h1>
              <h2 className="text-white text-xl text-center ">
                {format(
                  new Date(schedule.date.split("T")[0] + "T08:00:00Z"),
                  "dd/MM/yyyy"
                )}
              </h2>
            </span>
          }

          {schedule?.hours
            ?.sort(
              (a, b) => Number(new Date(a.time)) - Number(new Date(b.time))
            )
            .map((hour: any, index: number) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center px-5 py-2 w-8/12 my-2  bg-primary rounded-full"
              >
                <div className="text-white text-xl">
                  {hour.time.split("T")[1].substring(0, 5)}
                </div>
                <div className="flex flex-col gap-2 ">
                  {schedule.appointments.some(
                    (appointment) => appointment.hourId === hour.id
                  ) ? (
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="text-white text-sm">Reservado</div>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="text-white text-sm">Disponivel</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )): <p className="text-center text-white">Não há agendamento para este dia</p>}
    </div>
  );
}

export default RenderScheduler;
