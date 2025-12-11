import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./Router/ReactRouterSetup.jsx";

export default function App() {
  const location = useLocation();
  
  // Routes yang tidak butuh navbar
  const routesWithoutNavbar = ['/artconnectlogin', '/artconnectsignup'];
  const hideNavbar = routesWithoutNavbar.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRouter />
    </>
  );
}
