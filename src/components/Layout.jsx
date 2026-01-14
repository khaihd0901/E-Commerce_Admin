import { Outlet } from "react-router";
import NavItem from "./NavItem";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="">
        <NavItem/>
      </div>
      <div className="">
        <div className="bg-white px-2 py-2 w-full">
            header
        </div>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
