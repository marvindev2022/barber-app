import { createContext, useContext, useEffect, useState } from "react";
import instance from "../service/instance";

export interface IAppointment {
  id: string;
  hour: {
    id: string;
    time: Date; // Adjust the type based on your actual date/time format
    scheduleId: string;
  };
  hourId: string;
  scheduleId: string;
}

export interface Hour {
  id: string;
  time: string; // Adjust the type based on your actual date/time format
  scheduleId: string;
}

export interface Schedule {
  id: string;
  adminId: string;
  date: string; // Adjust the type based on your actual date format
  hours: Hour[];
  appointments: IAppointment[];
}

export interface RenderSchedulerState {
  scheduler: Schedule[];
}

export interface IScheduler {
  id: string;
  adminId: string;
  date: string; // Adjust the type based on your actual date format
  hours: Hour[];
  appointments: IAppointment[];
}

interface IcontextProps {
  children: React.ReactNode;
}

interface ServiceContextType {
  scheduler: IScheduler[];
  setScheduler: React.Dispatch<React.SetStateAction<IScheduler[]>>;
  appointment: IAppointment[];
  setAppointment: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<IcontextProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // You can set the initial date here
  const [scheduler, setScheduler] = useState<IScheduler[]>([]);
  const [appointment, setAppointment] = useState<IAppointment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulerResponse, appointmentResponse] = await Promise.all([
          instance.get(`/schedule/all`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          instance.get("/appointment/all", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const schedulerData = schedulerResponse.data.filter(
          (schedule: any) =>
            Number(new Date(schedule.date.split("T")[0]+"T08:00:00Z")) >= Number(new Date())
        );
       
        
        setScheduler(schedulerData);
        setAppointment(appointmentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const ServiceContextValue: ServiceContextType = {
    scheduler,
    setScheduler,
    appointment,
    setAppointment,
    selectedDate,
    setSelectedDate,
  };

  return (
    <ServiceContext.Provider value={ServiceContextValue}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);

  if (context === undefined) {
    throw new Error("useService must be used within a ServiceProvider");
  }

  return context;
};
