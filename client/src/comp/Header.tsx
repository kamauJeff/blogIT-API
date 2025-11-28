import { Link } from "react-router-dom";
import LoggedOutNav from "./LoggedOutNav";
import LoggedInNav from "./LoggedInNav";
import useUser from "@/store/user";

function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img src={logoImg} alt="logo" className="size-15" />
      <h1 className="font-bold text-3xl uppercase">Blogit</h1>
    </Link>
  );
}

function Header() {
  const { user } = useUser();
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex items-center justify-between border-b">
        <Logo />
        {user ? <LoggedInNav /> : <LoggedOutNav />}
      </div>
    </header>
  );
}
export default Header;
