// src/components/Navbar.jsx
import { useAuth } from "../AuthContext.jsx";
import NavbarBeforeLogin from "./NavbarBeforeLogin.jsx";
import NavbarAfterLogin from "./NavbarAfterLogin.jsx";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />;
}
