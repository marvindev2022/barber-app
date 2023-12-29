import { useEffect, useState } from "react";
import { format,  } from "date-fns";
import { useService } from "../../../Context/service.context";



export default function RenderAppointment(): JSX.Element {
  
  const { appointment,selectedDate } = useService();
  const [filteredAppointment, setFilteredAppointment] = useState<any[]>(appointment);
  useEffect(() => {
    const filteredApppointment = appointment.filter(item=>format(new Date(item.hour.time.toString().split("T")[0]+"T08:00:00Z"),"dd/MM/yyyy") === format(selectedDate ?? new Date(), "dd/MM/yyyy"))
    setFilteredAppointment(filteredApppointment);
  }, [selectedDate]);

  return (
    <section className="flex flex-col justify-center items-center gap-5 rounded-3xl bg-secondary py-5 ">
      <h1 className="text-white text-xl text-center ">Reservas</h1>
      <div className="w-8/12 h-full flex flex-col gap-5 max-h-[40rem] bg-primary rounded-full">
      {filteredAppointment
        ?.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date))).map((item: any) => (
        <div
          key={item.id}
          className="w-full h-full flex flex-col gap-5 max-h-[40rem]"
        >
          <div className="flex flex-row justify-between items-center px-5 py-2">
            <div className="text-white text-xl">
              {item?.hour?.time.split("T")[1].substring(0, 5)}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="text-white text-sm">Reservado</div>
              </div>
            </div>
          </div>
        </div>
      )) ?? <p>Não há reserva para este dia</p>}
    </div>
    </section>
  );
}
