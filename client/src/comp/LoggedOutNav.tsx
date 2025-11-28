import {
  NavigationMenu,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Link } from "react-router-dom";

function LoggedOutNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-5">
        <Link to="/register" className="font-bold text-base">
          Register
        </Link>
        <Link
          to="/login"
          className="font-bold text-base bg-blue-600 
          text-white px-4 py-2 rounded-md"
        >
          Login
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default LoggedOutNav;
