import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);
  return (
    <header className="py-10 bg-slate-800 border-b border-b-slate-700 w-full sticky top-0 left-0">
      <div className="max-w-7xl mx-auto text-white">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h1 className="font-bold">Job Board</h1>
          </Link>
          <div className="space-x-10">
            <NavLink to={"contact"}>Contact</NavLink>
            <NavLink to={"demo"}>Demo</NavLink>
            {user && <NavLink to={"add-job"}>Add Job</NavLink>}
            <NavLink to={"login"}>{user ? "Profile" : "Login"}</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
