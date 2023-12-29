import img from "./../../../../assets/service.svg";
import { useClient } from "../../Context/Client.context";
import { motion } from "framer-motion";
export default function RenderServices() {
  const { filterServices } = useClient();
  return (
    <section className="w-full max-h-screen flex flex-wrap gap-5 justify-center items-center overflow-y-auto ">
      {filterServices.map((service) => (
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          translate="yes"
          key={service.id}
          className="w-[147px] h-[184px] flex flex-col items-center justify-center  bg-newgray rounded-3xl hover:bg-primary hover:text-white hover:shadow-2 px-1"
        >
          <img src={img} alt={service.name} className="w-1/2 h-1/2" />
          <h2 className="text-center font-extrabold text-xl">{service.name}</h2>
          <h2 className="font-extrabold text-sm">{service.price}</h2>
        </motion.div>
      ))}
    </section>
  );
}
