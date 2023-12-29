import { loginSchema } from "../../../schema/user.schema";
import { useAuth } from "../Context/auth.context";
import instance from "../service/instance";

interface IUserResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
}

export default function FormSignin() {
  const {
    inputEmail,
    inputPassword,
    formInputsSigninState,
    setFormInputsSigninState,
  } = useAuth();
  const inputRefs = {
    email: inputEmail,
    password: inputPassword,
  };

  function resetBorderColor() {
    const inputs = [inputEmail, inputPassword];

    inputs.forEach((input) => {
      input && input.current && (input.current.style.border = "1px solid #ccc");
    });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetBorderColor();
    const validate = loginSchema.validate(formInputsSigninState, {
      abortEarly: false,
    });
    if (validate.error) {
      validate.error.details.forEach((err) => {
        const input = inputRefs[err.context?.key as keyof typeof inputRefs];
        input &&
          input.current &&
          (input.current.style.border = "1px solid red");
      });
    }
    async function fetchSignin() {
      const { data, status } = await instance.post(
        "/users/login",
        formInputsSigninState
      );
      const { token, ...user } = data as IUserResponse;
      if (status < 400) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
    fetchSignin();
  }
  return (
    <form
      className="flex flex-col gap-8 items-center mt-8"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputEmail}
        value={formInputsSigninState.email}
        onChange={(e) => {
          setFormInputsSigninState({
            ...formInputsSigninState,
            email: e.target.value,
          });
        }}
        className="border border-x-transparent border-t-transparent border-b-black text-black w-64 h-10 placeholder-black placeholder:font-bold"
        type="email"
        placeholder="Email"
      />
      <input
        ref={inputPassword}
        value={formInputsSigninState.password}
        onChange={(e) => {
          setFormInputsSigninState({
            ...formInputsSigninState,
            password: e.target.value,
          });
        }}
        className="border border-x-transparent border-t-transparent border-b-black text-black w-64 h-10 placeholder-black placeholder:font-bold"
        type="password"
        placeholder="Senha"
      />
      <button
        type="submit"
        className="bg-primary w-[306px] h-[101px] rounded-full font-bold text-white absolute bottom-10"
      >
        Entrar
      </button>
    </form>
  );
}
