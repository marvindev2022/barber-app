import RenderCalendar from "../calendar";
import RenderScheduler from "./scheduler/scheduler";

export default function RenderSchedulerService() {
  return (
    <section className="w-full h-full px-5 flex flex-col gap-5 pb-5">
      <RenderCalendar />
      <RenderScheduler />
    </section>
  );
}
