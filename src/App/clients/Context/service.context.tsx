import { createContext, useContext, useEffect, useState } from "react";
import instance from "../service/instance";
import { notifyError } from "../utils/notifications";
import { getItem } from "../utils/storage";

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
  const token = getItem("token");
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
              Authorization: `Bearer ${token}`,
            },
          }),
          instance.get("/appointment/all", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

       
        
        setScheduler(schedulerResponse.data);
        setAppointment(appointmentResponse.data);
      } catch (error:any) {
        notifyError( error.message);
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
    notifyError("useService must be used within a ServiceProvider");
    throw new Error("useService must be used within a ServiceProvider");
  }

  return context;
};
