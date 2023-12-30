import { useNavigate } from "react-router-dom";
import { useClient } from "../../Context/Client.context";
import { removeItem } from "../../utils/storage";

export default function RenderDashBoard() {
  const height = window.innerHeight > 667;
  const { openDash, setOpenDash } = useClient();
  const navigate = useNavigate();

  function handleLogout() {
    removeItem("token");
    removeItem("user");
    setOpenDash(false);
    navigate("/client");
  }

  return (
    <section
      className={`w-screen h-screen bg-white bg-opacity-50 fixed inset-0 z-50 ${
        openDash ? "block" : "hidden"
      }`}
    >
      <div
        className={`w-[14.8125rem] ${
          !height ? "h-full" : "h-[45rem] "
        } bg-primary flex flex-col justify-start items-center rounded-t-3xl  absolute ${
          !height ? "top-20" : "bottom-0"
        }`}
      >
        <ul className="flex flex-col justify-center items-start  ">
          <img
            className="w-[5.625rem] h-[5.625rem] rounded-full my-8 border-4 border-green-500 mx-auto"
            src="https://avatars.githubusercontent.com/u/60052506?v=4"
            alt="profile"
          />
          <li className="text-white text-[1.5rem] my-4 hover:underline hover:font-extrabold  ">
            Dados Pessoais
          </li>
          <li className="text-white text-[1.5rem] my-4 hover:underline hover:font-extrabold  ">
            Agendamentos
          </li>
          <li className="text-white text-[1.5rem] my-4 hover:underline hover:font-extrabold  ">
            Mensagens
          </li>
          <li className="text-white text-[1.5rem] my-4 hover:underline hover:font-extrabold  ">
            Compras
          </li>
          <p
            onClick={handleLogout}
            className={`text-white text-[1.5rem] my-4 hover:underline hover:font-extrabold   absolute ${
              height ? "bottom-5" : "bottom-20"
            } left-[40%] right-[50%]`}
          >
            Sair
          </p>
        </ul>
      </div>
    </section>
  );
}
