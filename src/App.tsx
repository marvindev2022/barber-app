import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "./assets/background.svg";
import logo from "./assets/logo.svg"
import { clear } from "./App/clients/utils/storage";

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>("");
  const navigate = useNavigate();
  function handleClick(option: string) {
    setSelectedOption(option);
  }
  useEffect(() => {
    if (selectedOption) {
      navigate(`/${selectedOption}`);
    }
  }, [selectedOption]);
  clear()
  return (
    <section
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen flex flex-col gap-5   items-center pt-10 px-5 "
    >
      <img className="w-[17.6875rem] h-[17.125rem]" src={logo} alt="logo" />
      <nav className="flex flex-col items-center text-white">
        <button
          className="bg-primary w-28 h-10 rounded-xl font-bold"
          onClick={() => {
            handleClick("barber");
          }}
        >
          Barbearia
        </button>
        <strong className="py-2 ">ou</strong>
        <button
          className="bg-primary w-28 h-10 rounded-xl font-bold"
          onClick={() => {
            handleClick("client");
          }}
        >
          Cliente
        </button>
      </nav>
    </section>
  );
}
