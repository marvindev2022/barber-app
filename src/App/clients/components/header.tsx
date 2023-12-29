import background from "./../../../assets/bg-header.svg";
import logo from "../../../assets/logo.svg";

export default function RenderHeader() {
  return (
    <header
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-64 bg-primary flex justify-center items-center  "
    >
      <img className="w-[14.375rem] h-[14.3125rem] mb-[-30px]" src={logo} alt="logo" />
    </header>
  );
}
