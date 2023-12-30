import RenderDashBoard from "../../components/menus/dashboard";
import RenderHeader from "../../components/header";
import RenderNav from "../../components/menus/Nav";
import RenderHamburgerMenu from "../../components/menus/hamburger";
import shopCar from "./../../../../assets/shopCar.svg";
import RenderServices from "../../components/services/services";
import { useClient } from "../../Context/Client.context";
import RenderProducts from "../../components/services/products";
import RenderSchedulerService from "../../components/services/schedule.service";
const count = 1;
export default function RenderHome() {
  const { sectionSelected, setInputSearch } =
    useClient();
  return (
    <section  className="w-full h-full flex flex-col  ">
      <RenderDashBoard />
      <div className="w-full h-64  flex ">
        <RenderHamburgerMenu />
        <RenderHeader />
        <div>
          <img
            src={shopCar}
            alt="shopCar"
            className="w-1/12 h-1/12 absolute right-4 top-4"
          />
          <p
            className={`rounded-full w-5 h-5 bg-red-500 text-white text-center text-xs absolute right-3 top-3 font-extrabold flex justify-center items-center ${
              count > 0 ? "block" : "hidden"
            }`}
          >
            {count}
          </p>
        </div>
      </div>
      <input
        type="search"
        placeholder="Pesquisar..."
        className="w-9/12 h-[3.125rem]  rounded-full  bg-secondary  placeholder-white  placeholder:text-start mx-auto mt-[-3.2rem] text-center text-white font-bold text-xl px-5"
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
      />
      <div className="w-full flex flex-col gap-5 max-h-[40rem]">
      <RenderNav />
      {sectionSelected === "Produtos" && <RenderProducts />}
      {sectionSelected === "Serviços" && <RenderServices />}
      {sectionSelected ===  "Agenda" && <RenderSchedulerService />}     
      </div>
    </section>
  );
}
