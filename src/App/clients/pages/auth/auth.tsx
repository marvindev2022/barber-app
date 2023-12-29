import React from "react";
import { useAuth } from "../../Context/auth.context";
import FormSignin from "../../components/Signin";
import { FormSignup } from "../../components/Signup";
import RenderHeader from "../../components/header";
const RenderAuth: React.FC = () => {
  const { setSelectedOption, selectedOption } = useAuth();

  const handleClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <section className="w-full h-full flex flex-col m-0 gap-0 p-0 relative items-center">
      <RenderHeader />
      <div className="w-[90%] h-[34.8125rem] flex flex-col  items-center  absolute z-10  top-[215px] bg-[#FFF9F9] mx-auto rounded-3xl">
        <div className=" flex flex-col items-center gap-2  ">
          <nav className="flex  w-full absolute top-0 my-5">
            <button
              onClick={() => handleClick("signin")}
              className={`w-[12.0625rem] h-16  absolute left-0 rounded-full text-xl  text-white font-extrabold   ${
                selectedOption === "signin"
                  ? "bg-primary z-10 text-left pl-8 "
                  : "bg-newgray"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleClick("signup")}
              className={`w-[12.0625rem] h-16  absolute right-0 rounded-full text-xl  text-white font-extrabold  ${
                selectedOption === "signup"
                  ? "bg-primary text-left pl-10 "
                  : "bg-newgray  text-right pr-10"
              }`}
            >
              Sign up
            </button>
          </nav>
        </div>
        <div className="w-full h-full flex flex-col mt-[120px] items-center">
          <span className="text-2xl font-extralight text-center">
            Bem vindo a Mr. Barber
          </span>
          {selectedOption === "signin" && <FormSignin />}
          {selectedOption === "signup" && <FormSignup />}
        </div>
      </div>
    </section>
  );
};

export default RenderAuth;
