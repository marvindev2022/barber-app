import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import RenderAuth from "../pages/auth/auth";
import { AuthProvider } from "../Context/auth.context";
import RenderHome from "../pages/home/home";
import { ClientProvider } from "../Context/Client.context";
import { ServiceProvider } from "../Context/service.context";

export default function MainRoutes(): JSX.Element {
  return (
    <AuthProvider>
      <ClientProvider>
        <ServiceProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/barber" element={<h1>Barber</h1>} />
          <Route path="/client" element={<RenderAuth />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/client/home" element={<RenderHome />} />
        </Routes>
        </ServiceProvider>
      </ClientProvider>
    </AuthProvider>
  );
}
