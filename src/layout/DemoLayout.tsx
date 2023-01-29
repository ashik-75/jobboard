import { NavLink, Outlet } from "react-router-dom";

function DemoLayout() {
  return (
    <div className="space-y-5">
      <div className="space-x-4">
        <NavLink
          to={"/demo"}
          className={({ isActive }) =>
            `${isActive ? "underline underline-offset-4" : ""} text-gray-400`
          }
        >
          Root
        </NavLink>
        <NavLink
          to={"form"}
          className={({ isActive }) =>
            `${isActive ? "underline underline-offset-4" : ""} text-gray-400`
          }
        >
          Form
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default DemoLayout;
