import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import useUser from "@/store/user";

function LoggedInNav() {
  const { user } = useUser();
  if (!user) return;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Link to="/blogs" className="font-bold text-base">
          All Blogs
        </Link>
        <Link to="blogs/completed" className="font-bold text-base">
          Completed blogs
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default LoggedInNav;
